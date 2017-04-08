import Component from "jwidget/Component";

export default class EmptyPlayer extends Component {
	constructor() {
		super();
	}

	protected renderRoot(el: JQuery) {
		el.addClass("gg-player g-lose");
	}
}
