import Component from "jwidget/Component";
import template from "jwidget/template";
import show from "jwidget/ui/show";

import Cup from "../models/Cup";

import Grid from "./Grid";
import Headers from "./Headers";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {
	private headers: Headers;
	private grid: Grid;

	constructor(private cup: Cup) {
		super();
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
}
