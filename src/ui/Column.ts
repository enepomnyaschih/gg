import Component from "jwidget/Component";
import {mapDestroyableArray} from "jwidget/mapper/array";
import show from "jwidget/ui/show";

import Column from "../models/Column";

import Match from "./Match";

export default class ColumnView extends Component {
	constructor(private column: Column) {
		super();
	}

	protected renderRoot(el: JQuery) {
		el.addClass("gg-column").css("padding", this.column.offset + "px 0");
		this.own(show(el, this.column.visible));
		return this.own(mapDestroyableArray(this.column.matches, (match) => new Match(match)));
	}
}
