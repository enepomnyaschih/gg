import Class from "jwidget/Class";
import Dictionary from "jwidget/Dictionary";

import Participant from "./Participant";

import * as DateUtils from "../utils/DateUtils";

export default class Match extends Class {
	id: number;
	closed: boolean;
	players: Participant[]; // 2 values
	score: number[]; // 2 values
	opened: Date;

	constructor(config: MatchConfig) {
		super();
		this.id = config.id;
		this.closed = config.closed;
		this.players = config.players;
		this.score = config.score;
		this.opened = config.opened;
	}

	static createByJson(json: any, participants: Dictionary<Participant>) {
		return new Match({
			id: +json["dbid"],
			closed: json["closed"],
			players: [
				participants[json["_players"][0]],
				participants[json["_players"][1]]
			],
			score: json["score"],
			opened: DateUtils.parse(json["opened"])
		});
	}
}

export interface MatchConfig {
	id: number;
	closed: boolean;
	players: Participant[]; // 2 values
	score: number[]; // 2 values
	opened: Date;
}
