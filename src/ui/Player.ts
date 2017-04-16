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
import template from "jwidget/template";

import Cup from "../models/Cup";
import Participant from "../models/Participant";

import {goodgame} from "../constants";

@template(require<string>("./Player.jw.html"))
export default class Player extends Component {
	private cup: Cup;
	private participant: Participant;
	private score: number;
	private win: boolean;

	constructor(config: PlayerViewConfig) {
		super();
		this.cup = config.cup;
		this.participant = config.participant;
		this.score = config.score;
		this.win = config.win;
	}

	protected renderLink(el: JQuery) {
		el.attr("href", this.participant.link);
		if (!this.win) {
			el.addClass("g-lose");
		}
	}

	protected renderAlign(el: JQuery) {
		el.click(() => {
			this.cup.alignBy.set(this.participant);
		});
	}

	protected renderAvatar(el: JQuery) {
		el.css("background-image", 'url("' + goodgame(this.participant.avatar) + '")');
	}

	protected renderName(el: JQuery) {
		el.text(this.participant.name);
	}

	protected renderScore(el: JQuery) {
		el.text(this.score);
	}
}

export interface PlayerViewConfig {
	cup: Cup;
	participant: Participant;
	score: number;
	win: boolean;
}
