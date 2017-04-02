import Component from "jwidget/Component";
import template from "jwidget/template";

import Cup from "../models/Cup";

import Headers from "./Headers";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {
	constructor(private cup: Cup) {
		super();
	}

	renderToolbar() {
		return false;
	}

	renderHeaders() {
		return false;
	}

	renderGrid() {
		return this.own(new Headers(this.cup));
	}
}
