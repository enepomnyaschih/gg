import Component from "jwidget/Component";
import JWArray from "jwidget/JWArray";

import Match from "../models/Match";

import EmptyPlayer from "./EmptyPlayer";
import Player from "./Player";

export default class MatchView extends Component {
	constructor(private match: Match) {
		super();
	}

	protected renderRoot() {
		return this.own(new JWArray([this.getPlayer(0), this.getPlayer(1)])).ownItems();
	}

	private getPlayer(index: number): Component {
		const participant = this.match.players[index];
		return participant ? new Player(participant, this.match.score[index]) : new EmptyPlayer();
	}
}
