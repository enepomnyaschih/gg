import Component from "jwidget/Component";
import {combine} from "./common/utils/FunctionUtils";

const lang: string = localStorage["locale"] || "ru";
const data = (<any>{
	en: require<any>("./locale/en.json"),
	ru: require<any>("./locale/ru.json")
})[lang];

export function current() {
	return lang;
}

export function get(key: string) {
	return data[key] || key;
}

function applyEls(els: JQuery, getter: (el: JQuery) => string, setter: (el: JQuery, value: string) => any) {
	if (!els) {
		return;
	}
	els.each((index, elem) => {
		index = index;
		const el = $(elem);
		setter(el, getter(el).replace(/[A-Z][A-Z_]*/g, (key) => get(key)))
	});
}

export function apply(component: Component) {
	applyEls(component.getElement("translate"), (el) => el.text(), (el, value) => el.text(value));
	applyEls(component.getElement("translate-title"), (el) => el.attr("title"), (el, value) => el.attr("title", value));
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
