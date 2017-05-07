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
import * as StringUtils from "jwidget/StringUtils";

import CupInfo from "../../common/models/CupInfo";
import {plural} from "../../common/utils/StringUtils";

@template(require<string>("./Cup.jw.html"))
export default class Cup extends Component {
	constructor(readonly cupInfo: CupInfo, readonly withDate: boolean = false) {
		super();
	}

	protected renderRoot(el: JQuery) {
		el.attr("href", this.cupInfo.href);
	}

	protected renderGame(el: JQuery) {
		el.text(this.cupInfo.gameTitle || "Другая");
	}

	protected renderTitle(el: JQuery) {
		el.text(this.cupInfo.title).attr("title", this.cupInfo.title);
	}

	protected renderPrize(el: JQuery) {
		el.text(Math.floor(this.cupInfo.prizeFund) + " \u20bd");
	}

	protected renderDate(el: JQuery) {
		if (!this.withDate) {
			return false;
		}
		const year = (this.cupInfo.start.getFullYear() !== new Date().getFullYear()) ?
			("." + this.cupInfo.start.getFullYear()) : "";
		el.text(
			StringUtils.prepend(String(this.cupInfo.start.getDate()), 2, "0") + "." +
			StringUtils.prepend(String(this.cupInfo.start.getMonth() + 1), 2, "0") + year + ", " +
			this.cupInfo.start.getHours() + ":" +
			StringUtils.prepend(String(this.cupInfo.start.getMinutes()), 2, "0"));
		return true;
	}

	protected renderParticipants(el: JQuery) {
		el.text(plural(this.cupInfo.participantCount, "участник", "участника", "участников"));
	}
}
