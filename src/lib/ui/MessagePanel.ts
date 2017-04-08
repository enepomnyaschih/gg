import Component from "jwidget/Component";

require("./MessagePanel.styl");

export default class MessagePanel extends Component {
	private cls: string;
	private html: boolean;

	constructor(private message: string, config?: MessagePanelConfig) {
		super();

		config = config || {};
		this.cls = config.cls;
		this.html = config.html || false;
	}

	renderRoot(el: JQuery) {
		if (this.html) {
			el.html(this.message);
		} else {
			el.text(this.message);
		}
		el.addClass('jw-message-panel');
		el.addClass(this.cls);
	}
}

export interface MessagePanelConfig {
	cls?: string;
	html?: boolean;
}
