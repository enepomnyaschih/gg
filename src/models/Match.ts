import Class from "jwidget/Class";
import Dictionary from "jwidget/Dictionary";

import Column from "./Column";
import Participant from "./Participant";

import * as DateUtils from "../utils/DateUtils";

import {MATCH_HEIGHT} from "../constants";

export default class Match extends Class {
	id: number;
	index: number;
	column: Column;
	closed: boolean;
	players: Participant[]; // 2 values
	score: number[]; // 2 values
	opened: Date;
	third: boolean;
	winner: number; // null if not yet closed

	constructor(config: MatchConfig) {
		super();
		this.id = config.id;
		this.index = config.index;
		this.column = config.column;
		this.closed = config.closed;
		this.players = config.players;
		this.score = config.score;
		this.opened = config.opened;
		this.third = config.third;

		this.winner =
			(!this.players[1] || this.score[0] >= this.column.maxScore) ? 0 :
			(!this.players[0] || this.score[1] >= this.column.maxScore) ? 1 : null;
	}

	get cup() {
		return this.column.cup;
	}

	get next() {
		const nextColumn = this.column.next;
		return !nextColumn ? null : nextColumn.matches.get(
			(this.cup.gridIndex === 0 || (this.column.index % 2 === 1)) ? Math.floor(this.index / 2) : this.index);
	}

	get nextPosition() {
		return (this.cup.gridIndex === 0 || (this.column.index % 2 === 1)) ? (this.index % 2) : 1;
	}

	get winnerPlayer() {
		return (this.winner != null) ? this.players[this.winner] : null;
	}

	get verticalPosition() {
		return this.index * (MATCH_HEIGHT + this.column.gap.get()) + this.column.offset.get();
	}

	hasPlayer(participant: Participant) {
		return this.players.indexOf(participant) !== -1;
	}

	static createByJson(json: any, column: Column, index: number, participants: Dictionary<Participant>) {
		return new Match({
			id: +json["dbid"],
			index: index,
			column: column,
			closed: json["closed"],
			players: [
				participants[json["_players"][0]],
				participants[json["_players"][1]]
			],
			score: json["score"],
			opened: DateUtils.parse(json["opened"]),
			third: (column.cup.gridIndex === 0) && json["third"]
		});
	}
}

export interface MatchConfig {
	id: number;
	index: number;
	column: Column;
	closed: boolean;
	players: Participant[]; // 2 values
	score: number[]; // 2 values
	opened: Date;
	third: boolean;
}
