import Component from "jwidget/Component";
import template from "jwidget/template";

import Column from "../models/Column";

@template(require<string>("./Header.jw.html"))
export default class Header extends Component {
	constructor(private column: Column) {
		super();
	}

	protected renderTitle(el: JQuery) {
		el.text(this.column.fullTitle);
	}

	protected renderHide(el: JQuery) {
		el.click((e) => {
			e.preventDefault();
		});
	}
}
