import Component from "jwidget/Component";
import JWArray from "jwidget/JWArray";
import Property from "jwidget/Property";
import template from "jwidget/template";
import css from "jwidget/ui/css";

import Match from "../models/Match";

import EmptyPlayer from "./EmptyPlayer";
import Player from "./Player";

import {AVATAR_SIZE, PLAYER_BOTTOM_MARGIN, THIRD_PLACE_MATCH_GAP, WINNER_LINE_OFFSET} from "../constants";

@template(require<string>("./Match.jw.html"))
export default class MatchView extends Component {
	private lineBegin: number;
	private lineEnd: Property<number>;

	constructor(private match: Match) {
		super();
	}

	protected beforeRender() {
		super.beforeRender();
		if (this.match.next) {
			this.lineBegin =
				(this.match.winner === 0) ? -WINNER_LINE_OFFSET :
				(this.match.winner === 1) ? WINNER_LINE_OFFSET : 0;
			// relying on the fact that model bindings get processed earlier than this one
			this.lineEnd = this.own(this.match.column.cup.hiddenColumns.mapValue(() => {
				return this.match.next.verticalPosition - this.match.verticalPosition +
					(this.match.nextPosition - .5) * (AVATAR_SIZE + PLAYER_BOTTOM_MARGIN);
			}));
		}
	}

	protected renderRoot(el: JQuery) {
		if (this.match === this.match.column.matches.getLast()) {
			return;
		}
		const matchBelow = this.match.column.matches.get(this.match.index + 1);
		if (matchBelow && matchBelow.third) {
			el.css("padding-bottom", THIRD_PLACE_MATCH_GAP + "px");
			return;
		}
		const padding = this.own(this.match.column.gap.mapValue((gap) => gap + "px"));
		css(el, "padding-bottom", padding);
	}

	protected renderPlayers() {
		return this.own(new JWArray([this.getPlayer(0), this.getPlayer(1)])).ownItems();
	}

	protected renderThirdPlaceTitle() {
		return this.match.third;
	}

	protected renderLines() {
		return this.match.next != null;
	}

	protected renderLine1(el: JQuery) {
		el.css("top", this.lineBegin + "px");
	}

	protected renderLine2(el: JQuery) {
		const top = this.own(this.lineEnd.mapValue((lineEnd) => lineEnd + "px"))
		this.own(css(el, "top", top));
	}

	protected renderLine3(el: JQuery) {
		const height = this.own(this.lineEnd.mapValue((lineEnd) => Math.abs(lineEnd - this.lineBegin) + "px"))
		css(el, "height", height);

		const top = this.own(this.lineEnd.mapValue((lineEnd) => Math.min(lineEnd, this.lineBegin) + "px"));
		css(el, "top", top);
	}

	private getPlayer(index: number): Component {
		const participant = this.match.players[index];
		return participant ? new Player(participant, this.match.score[index], this.match.winner === index) :
			new EmptyPlayer();
	}
}
