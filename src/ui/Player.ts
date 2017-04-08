import Component from "jwidget/Component";
import template from "jwidget/template";

import Participant from "../models/Participant";

import {GOODGAME_API} from "../constants";

@template(require<string>("./Player.jw.html"))
export default class Player extends Component {
	constructor(private participant: Participant, private score: number, private win: boolean) {
		super();
	}

	protected renderRoot(el: JQuery) {
		el.attr("href", this.participant.link);
		if (!this.win) {
			el.addClass("g-lose");
		}
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
