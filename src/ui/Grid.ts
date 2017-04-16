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
import Updater from "jwidget/Updater";

import Cup from "../models/Cup";

import Column from "./Column";

import {MATCH_GAP, MATCH_HEIGHT} from "../constants";

export default class Grid extends Component {
	constructor(private cup: Cup) {
		super();
	}

	renderRoot(el: JQuery) {
		this.own(new Updater([this.cup.alignBy], (alignBy) => {
			if (!alignBy) {
				return;
			}
			const index = this.cup.getParticipantVerticalIndex(alignBy);
			el.scrollTop(MATCH_GAP + (index + .5) * (MATCH_HEIGHT + MATCH_GAP) - el.outerHeight() / 2);
		}).watch(this.cup.hiddenColumns));
		return this.own(mapDestroyableArray(this.cup.grid, (column) => new Column(column)));
	}
}
