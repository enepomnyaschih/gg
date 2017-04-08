import Component from "jwidget/Component";
import {mapDestroyableArray} from "jwidget/mapper/array";
import css from "jwidget/ui/css";
import show from "jwidget/ui/show";

import Column from "../models/Column";

import Match from "./Match";

export default class ColumnView extends Component {
	constructor(private column: Column) {
		super();
	}

	protected renderRoot(el: JQuery) {
		const padding = this.own(this.column.offset.mapValue((offset) => offset + "px 0 0"));
		el.addClass("gg-column");
		this.own(css(el, "padding", padding));
		this.own(show(el, this.column.visible));
		return this.own(mapDestroyableArray(this.column.matches, (match) => new Match(match)));
	}
}
