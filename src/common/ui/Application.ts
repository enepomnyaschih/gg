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
import template from "jwidget/template";

import {GOODGAME_HOSTNAME} from "../../constants";
import {localized} from "../../locale";
import * as locale from "../../locale";

@localized
@template(require<string>("./Application.jw.html"))
export default class Application extends Component {
	constructor(private ggLink: string, private page: Component) {
		super();
	}

	ownPage(): this {
		this.own(this.page);
		return this;
	}

	protected renderGgLink(el: JQuery) {
		el.attr("href", GOODGAME_HOSTNAME + "/" + this.ggLink);
	}

	protected renderLocaleCurrent(el: JQuery) {
		el.attr("data-locale", locale.current());
	}

	protected renderLocaleOption(el: JQuery) {
		el.click((e) => {
			e.preventDefault();
			locale.reload($(e.target).attr("data-locale"));
		});
	}

	protected renderPage() {
		return this.page;
	}
}
