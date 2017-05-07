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

import CupList from "../../common/models/CupList";

import CupTable from "./CupTable";

@template(require<string>("./Page.jw.html"))
export default class Page extends Component {
	constructor(readonly cupList: CupList) {
		super();
	}

	protected renderStarted() {
		return this.own(new CupTable(this.cupList.started, false));
	}

	protected renderOpened() {
		return this.own(new CupTable(this.cupList.opened, true));
	}
}
