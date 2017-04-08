import Component from "jwidget/Component";
import template from "jwidget/template";
import show from "jwidget/ui/show";

import Cup from "../models/Cup";

import Grid from "./Grid";
import Headers from "./Headers";

import {GRID_TYPE_SINGLE} from "../constants";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {
	private headers: Headers;
	private grid: Grid;

	constructor(private cup: Cup) {
		super();
	}

	protected renderShowWinners(el: JQuery) {
		return this._renderGridLink(el, 0, "winners");
	}

	protected renderShowLosers(el: JQuery) {
		return this._renderGridLink(el, 1, "losers");
	}

	protected renderShowColumns(el: JQuery) {
		this.own(show(el, <any>this.cup.hiddenColumns));
		el.click((e) => {
			e.preventDefault();
			this.cup.hiddenColumns.set(0);
		});
	}

	protected renderHeaders() {
		return this.headers = this.own(new Headers(this.cup));
	}

	protected renderGrid() {
		return this.grid = this.own(new Grid(this.cup));
	}

	protected afterAppend() {
		super.afterAppend();
		this.syncScroll();
		this.grid.el.scroll(() => this.syncScroll());
	}

	private syncScroll() {
		this.headers.el.scrollLeft(this.grid.el.scrollLeft());
	}

	private _renderGridLink(el: JQuery, index: number, link: string) {
		if (this.cup.gridType === GRID_TYPE_SINGLE) {
			return false;
		}
		if (this.cup.gridIndex === index) {
			el.addClass("g-active");
		} else {
			el.attr("href", "/" + this.cup.id + "/" + link);
		}
		return null;
	}
}
