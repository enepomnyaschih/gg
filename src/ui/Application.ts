import Component from "jwidget/Component";
import template from "jwidget/template";

import Cup from "../models/Cup";

import Grid from "./Grid";
import Headers from "./Headers";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {
	constructor(private cup: Cup) {
		super();
	}

	protected renderToolbar() {
		return false;
	}

	protected renderHeaders() {
		return this.own(new Headers(this.cup));
	}

	protected renderGrid() {
		return this.own(new Grid(this.cup));
	}
}
