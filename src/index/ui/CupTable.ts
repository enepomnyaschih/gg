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

import AbstractArray from "jwidget/AbstractArray";
import Component from "jwidget/Component";
import {mapDestroyableArray} from "jwidget/mapper/array";
import template from "jwidget/template";

import CupInfo from "../../common/models/CupInfo";

import Cup from "./Cup";

@template(require<string>("./CupTable.jw.html"))
export default class CupTable extends Component {
	constructor(readonly cups: AbstractArray<CupInfo>, private withDates: boolean = false) {
		super();
	}

	protected renderDate() {
		return this.withDates;
	}

	protected renderCups() {
		return mapDestroyableArray(this.cups, (cupInfo) => new Cup(cupInfo, this.withDates));
	}
}
