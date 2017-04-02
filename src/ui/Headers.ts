import Component from "jwidget/Component";
import {mapDestroyableArray} from "jwidget/mapper/array";

import Cup from "../models/Cup";

import Header from "./Header";

export default class Headers extends Component {
	constructor(private cup: Cup) {
		super();
	}

	renderRoot() {
		return this.own(mapDestroyableArray(this.cup.grid, (column) => new Header(column)));
	}
}
