import Component from "jwidget/Component";
import Destroyable from "jwidget/Destroyable";
import Property from "jwidget/Property";
import template from "jwidget/template";

import RestRequest from "../rest/RestRequest";
import MessagePanel from "../ui/MessagePanel";

@template(require<string>("./LoadPanel.jw.html"))
export default class LoadPanel<T> extends Component {
	private loader: LoadPanelLoader<T>;
	private renderer: LoadPanelRenderer<T>;
	private showRefresh: boolean;

	private request = this.own(new Property<Destroyable>()).ownValue();
	private content = this.own(new Property<Component>()).ownValue();

	constructor(config: LoadPanelConfig<T>) {
		super();

		this.loader = config.loader;
		this.renderer = config.renderer;
		this.showRefresh = config.showRefresh || false;
	}

	protected renderRefresh(el: JQuery) {
		if (!this.showRefresh) {
			return false;
		}
		el.click(() => this.reload());
		return null;
	}

	protected renderContent() {
		return this.content;
	}

	protected afterAppend() {
		super.afterAppend();
		this.reload();
	}

	reload() {
		if (!this.request.get()) {
			this.content.set(new LoadIndicator());
			this.request.set(this.loader().then(
				(data) => this._onDone(data),
				() => this._onFail()));
		}
	}

	_onDone(data: T) {
		this.request.set(null);
		this.content.set(this.renderer(data, this));
	}

	_onFail() {
		this.request.set(null);
		this.content.set(new MessagePanel('UNABLE_TO_LOAD_CONTENT'));
	}
}

export interface LoadPanelLoader<T> {
	(): RestRequest<T>;
}

export interface LoadPanelRenderer<T> {
	(data: T, loadPanel: LoadPanel<T>): Component;
}

export interface LoadPanelConfig<T> {
	loader: LoadPanelLoader<T>;
	renderer: LoadPanelRenderer<T>
	showRefresh?: boolean;
}

export class LoadIndicator extends Component {
	protected renderRoot(el: JQuery) {
		el.append('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>');
	}
}
