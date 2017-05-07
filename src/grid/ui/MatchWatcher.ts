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
import Property from "jwidget/Property";
import template from "jwidget/template";

import Match from "../models/Match";

import MatchView from "./Match";

@template(require<string>("./MatchWatcher.jw.html"))
export default class MatchWatcher extends Component {
	constructor(private match: Match) {
		super();
	}

	renderMatch() {
		const view = this.own(new Property<Component>(new MatchView(this.match))).ownValue();
		this.own(this.match.changeEvent.bind(() => {
			view.set(new MatchView(this.match));
		}));
		return view;
	}
}
