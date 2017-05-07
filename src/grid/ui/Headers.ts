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
import {mapDestroyableArray} from "jwidget/mapper/array";

import Cup from "../models/Cup";

import Header from "./Header";

export default class Headers extends Component {
	constructor(private cup: Cup) {
		super();
	}

	renderRoot() {
		return this.own(mapDestroyableArray(this.cup.grid, (column) => new Header(column)));
	}
}
