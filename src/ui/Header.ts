import Component from "jwidget/Component";
import template from "jwidget/template";
import show from "jwidget/ui/show";

import Column from "../models/Column";

import {UNHIDEABLE_COLUMN_COUNT} from "../constants";

@template(require<string>("./Header.jw.html"))
export default class Header extends Component {
	constructor(private column: Column) {
		super();
	}

	protected renderRoot(el: JQuery) {
		this.own(show(el, this.column.visible));
	}

	protected renderTitle(el: JQuery) {
		el.text(this.column.fullTitle);
	}

	protected renderHide(el: JQuery) {
		if (this.column.index >= this.column.cup.grid.getLength() - UNHIDEABLE_COLUMN_COUNT) {
			return false;
		}
		el.click((e) => {
			e.preventDefault();
			this.column.cup.hiddenColumns.set(this.column.index + 1);
		});
		return null;
	}
}
