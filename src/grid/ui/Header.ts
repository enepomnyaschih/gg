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
import show from "jwidget/ui/show";

import Column from "../models/Column";

import {UNHIDEABLE_COLUMN_COUNT} from "../../constants";

@template(require<string>("./Header.jw.html"))
export default class Header extends Component {
	constructor(private column: Column) {
		super();
	}

	protected renderRoot(el: JQuery) {
		this.own(show(el, this.column.visible));
	}

	protected renderTitle(el: JQuery) {
		el.text(this.column.fullTitle);
	}

	protected renderHide(el: JQuery) {
		if (this.column.index >= this.column.cup.grid.getLength() - UNHIDEABLE_COLUMN_COUNT) {
			return false;
		}
		el.click((e) => {
			e.preventDefault();
			this.column.cup.hiddenColumns.set(this.column.index + 1);
		});
		return null;
	}
}
