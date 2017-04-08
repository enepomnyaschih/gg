import Component from "jwidget/Component";
import template from "jwidget/template";

import Cup from "../models/Cup";
import Participant from "../models/Participant";

import {GOODGAME_API} from "../constants";

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
		el.css("background-image", 'url("' + GOODGAME_API + this.participant.avatar + '")');
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
