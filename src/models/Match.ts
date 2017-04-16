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

import * as ArrayUtils from "jwidget/ArrayUtils";
import Class from "jwidget/Class";
import Dictionary from "jwidget/Dictionary";
import Event from "jwidget/Event";

import Column from "./Column";
import Participant from "./Participant";

import * as DateUtils from "../utils/DateUtils";

import {MATCH_HEIGHT} from "../constants";

export default class Match extends Class {
	id: number;
	index: number;
	column: Column;
	players: Participant[]; // 2 values
	score: number[]; // 2 values
	opened: Date;
	third: boolean;
	winner: number; // null if not yet closed

	changeEvent = this.own(new Event());

	constructor(config: MatchConfig) {
		super();
		this.id = config.id;
		this.index = config.index;
		this.column = config.column;
		this.players = config.players;
		this.score = config.score;
		this.opened = config.opened;
		this.third = config.third;

		this.winner = this.computeWinner();
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

	get playerIds() {
		return this.players.map((participant) => participant ? participant.id : null);
	}

	hasPlayer(participant: Participant) {
		return this.players.indexOf(participant) !== -1;
	}

	update(match: Match) {
		if (ArrayUtils.equal(this.playerIds, match.playerIds) &&
			ArrayUtils.equal(this.score, match.score)) {
			return;
		}
		this.players.splice(0, 2, match.players[0], match.players[1]);
		this.score.splice(0, 2, match.score[0], match.score[1]);
		this.winner = this.computeWinner();
		this.changeEvent.trigger();
	}

	private computeWinner() {
		return (!this.players[1] || this.score[0] >= this.column.maxScore) ? 0 :
		       (!this.players[0] || this.score[1] >= this.column.maxScore) ? 1 : null;
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
