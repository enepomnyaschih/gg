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
import cls from "jwidget/ui/class";

import Match from "../models/Match";
import Participant from "../models/Participant";

import * as ParticipantService from "../services/Participant";

@template(require<string>("./Player.jw.html"))
export default class Player extends Component {
	private participant: Participant;

	constructor(private match: Match, private index: number) {
		super();
		this.participant = match.players[index];
	}

	protected renderRoot(el: JQuery) {
		this.own(cls(el, "g-aligned", this.participant.aligned));
	}

	protected renderLink(el: JQuery) {
		el.attr("href", this.participant.link);
		if ((this.match.winner != null) && (this.match.winner !== this.index)) {
			el.addClass("g-lose");
		}
	}

	protected renderAlign(el: JQuery) {
		el.click(() => {
			this.match.cup.alignBy.set(this.participant);
		});
	}

	protected renderAvatar(el: JQuery) {
		el.css("background-image", 'url("' + ParticipantService.getAvatarUrl(this.participant.avatar) + '")');
	}

	protected renderName(el: JQuery) {
		el.text(this.participant.name);
	}

	protected renderScore(el: JQuery) {
		el.text(this.match.score[this.index]);
		return this.match.started;
	}
}
