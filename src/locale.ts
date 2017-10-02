import Component from "jwidget/Component";
import Dictionary from "jwidget/Dictionary";
import {combine} from "./common/utils/FunctionUtils";

const lang: string = localStorage["locale"] || "ru";
const data = (<any>{
	en: require<any>("./locale/en.json"),
	ru: require<any>("./locale/ru.json")
})[lang];

export function current() {
	return lang;
}

export function get(key: string, replaces?: Dictionary<string>): string;
export function get(key: string, replacer?: (id: string) => string): string;
export function get(key: string, replaces?: any): string {
	const tpl: string = data[key];
	if (!tpl) {
		return key;
	}
	return tpl.replace(/\$\{([^\}]+)\}/g, (typeof replaces === "function") ? (substr, id) => {
		substr = substr;
		return replaces(id);
	} : (substr, id) => {
		substr = substr;
		return replaces[id];
	});
}

function applyEls(component: Component, jwId: string, getter: (el: JQuery) => string, setter: (el: JQuery, value: string) => any) {
	const els = component.getElement(jwId);
	if (!els) {
		return;
	}
	els.each((index, elem) => {
		index = index;
		const el = $(elem);
		setter(el, getter(el).replace(/[A-Z][A-Z0-9_]*/g, (key) => {
			return get(key, (id) => (<any>component)[el.attr("data-" + id)]);
		}));
	});
}

export function apply(component: Component) {
	applyEls(component, "translate", (el) => el.text(), (el, value) => el.text(value));
	applyEls(component, "translate-html", (el) => el.html(), (el, value) => el.html(value));
	applyEls(component, "translate-title", (el) => el.attr("title"), (el, value) => el.attr("title", value));
}

function applyThis() {
	apply(this);
}

export function localized(target: any) {
	target.prototype.beforeRender = combine(target.prototype.beforeRender, applyThis);
}

export function reload(locale: string) {
	localStorage["locale"] = locale;
	location.reload();
}

export default get;
