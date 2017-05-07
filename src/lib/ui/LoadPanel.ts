/*
	Tournament grid
	Copyright (C) 2017  Egor Nepomnyaschih

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along
	with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
		this.content.set(new MessagePanel('Не удалось загрузить содержимое.'));
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
