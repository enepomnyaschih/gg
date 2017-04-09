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
import JWArray from "jwidget/JWArray";
import Property from "jwidget/Property";

import Column from "./Column";
import Participant from "./Participant";

import * as DateUtils from "../utils/DateUtils";

import {GRID_TYPE_DOUBLE} from "../constants";

export default class Cup extends Class {
	id: number;
	started: boolean;
	logo: string;
	title: string;
	gameTitle: string;
	start: Date; // parse in Moscow timezone
	prizeFund: number;
	participants: Dictionary<Participant>;
	description: string;
	finalbo: number;
	creatorHtml: string;
	gridType: number;
	gridIndex: number; // 0 - winners, 1 - losers
	grid: JWArray<Column>;
	hiddenColumns = new Property<number>(0);
	alignBy = new Property<Participant>();

	constructor(config: CupConfig) {
		super();
		this.id = config.id;
		this.started = config.started;
		this.logo = config.logo;
		this.title = config.title;
		this.gameTitle = config.gameTitle;
		this.start = config.start;
		this.prizeFund = config.prizeFund;
		this.participants = config.participants;
		this.description = config.description;
		this.finalbo = config.finalbo;
		this.creatorHtml = config.creatorHtml;
		this.gridType = config.gridType;
		this.gridIndex = config.gridIndex;
		this.grid = new JWArray(config.grid);
	}

	static createByJson(json: any, gridIndex: number) {
		const cupJson = json["cup"];
		const participantArray = (<any[]>cupJson["participants"]).map(Participant.createByJson);
		const participants = ArrayUtils.index(participantArray, (participant) => participant.id);
		const cup = new Cup({
			id: cupJson["id"],
			started: cupJson["started"],
			logo: cupJson["logo"],
			title: cupJson["title"],
			gameTitle: cupJson["gameTitle"],
			start: DateUtils.parse(cupJson["start"]),
			prizeFund: cupJson["prize_fund"],
			participants: participants,
			description: cupJson["description"],
			finalbo: +cupJson["finalbo"],
			creatorHtml: cupJson["creator"],
			gridType: cupJson["grid_type"],
			gridIndex: gridIndex
		});
		const filteredColumnsJson = (<any[]>json["grid"]).filter((columnJson) => columnJson["losers"] === gridIndex);
		cup.grid.addAll(filteredColumnsJson.map((json, index) => {
			const superfinal =
				(cup.gridType === GRID_TYPE_DOUBLE) &&
				(cup.gridIndex === 0) &&
				(index === filteredColumnsJson.length - 1);
			return Column.createByJson(json, index, cup, participants, superfinal);
		}));
		return cup;
	}
}

export interface CupConfig {
	id: number;
	started: boolean;
	logo: string;
	title: string;
	gameTitle: string;
	start: Date;
	prizeFund: number;
	participants: Dictionary<Participant>;
	description: string;
	finalbo: number;
	creatorHtml: string;
	gridType: number;
	gridIndex: number;
	grid?: Column[];
}
