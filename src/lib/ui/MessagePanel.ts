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
