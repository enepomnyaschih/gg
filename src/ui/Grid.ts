import Component from "jwidget/Component";
import {mapDestroyableArray} from "jwidget/mapper/array";

import Cup from "../models/Cup";

import Column from "./Column";

export default class Grid extends Component {
	constructor(private cup: Cup) {
		super();
	}

	renderRoot() {
		return this.own(mapDestroyableArray(this.cup.grid, (column) => new Column(column)));
	}
}
