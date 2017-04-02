import Component from "jwidget/Component";
import JWArray from "jwidget/JWArray";
import template from "jwidget/template";

import Match from "../models/Match";

import EmptyPlayer from "./EmptyPlayer";
import Player from "./Player";

import {WINNER_LINE_OFFSET} from "../constants";

@template(require<string>("./Match.jw.html"))
export default class MatchView extends Component {
	private linePosition: number;

	constructor(private match: Match) {
		super();
	}

	protected beforeRender() {
		super.beforeRender();
		this.linePosition =
			(this.match.winner === 0) ? -WINNER_LINE_OFFSET :
			(this.match.winner === 1) ? WINNER_LINE_OFFSET : 0;
	}

	protected renderRoot(el: JQuery) {
		if (this.match !== this.match.column.matches.getLast()) {
			el.css("padding-bottom", this.match.column.gap + "px");
		}
	}

	protected renderPlayers() {
		return this.own(new JWArray([this.getPlayer(0), this.getPlayer(1)])).ownItems();
	}

	protected renderLine1(el: JQuery) {
		el.css("top", this.linePosition + "px");
	}

	private getPlayer(index: number): Component {
		const participant = this.match.players[index];
		return participant ? new Player(participant, this.match.score[index]) : new EmptyPlayer();
	}
}
