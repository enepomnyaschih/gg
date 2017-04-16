/*
	Tournament grid
	Copyright (C) 2017  Egor Nepomnyaschih

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along
	with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import Component from "jwidget/Component";
import {mapDestroyableArray} from "jwidget/mapper/array";
import css from "jwidget/ui/css";
import show from "jwidget/ui/show";

import Column from "../models/Column";

import MatchWatcher from "./MatchWatcher";

export default class ColumnView extends Component {
	constructor(private column: Column) {
		super();
	}

	protected renderRoot(el: JQuery) {
		const padding = this.own(this.column.offset.mapValue((offset) => offset + "px 0 0"));
		el.addClass("gg-column");
		this.own(css(el, "padding", padding));
		this.own(show(el, this.column.visible));
		return this.own(mapDestroyableArray(this.column.matches, (match) => new MatchWatcher(match)));
	}
}
