import Component from "jwidget/Component";
import template from "jwidget/template";

@template(require<string>("./EmptyPlayer.jw.html"))
export default class EmptyPlayer extends Component {
	constructor() {
		super();
	}

	protected renderRoot(el: JQuery) {
		el.addClass("gg-player g-lose");
	}
}
