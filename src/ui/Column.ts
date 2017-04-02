import Component from "jwidget/Component";
import {mapDestroyableArray} from "jwidget/mapper/array";

import Column from "../models/Column";

import Match from "./Match";

export default class ColumnView extends Component {
	constructor(private column: Column) {
		super();
	}

	renderRoot(el: JQuery) {
		el.addClass("gg-column");
		return this.own(mapDestroyableArray(this.column.matches, (match) => new Match(match)));
	}
}
