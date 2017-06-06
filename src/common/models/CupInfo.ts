/*
	Tournament grid
	Copyright (C) 2017  Egor Nepomnyaschih

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along
	with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import Class from "jwidget/Class";

export default class CupInfo extends Class {
	readonly id: number;
	readonly started: boolean;
	readonly logo: string;
	readonly title: string;
	readonly game: string;
	readonly gameTitle: string;
	readonly start: Date; // parse in Moscow timezone
	readonly prizeFund: number;
	readonly participantCount: number;

	constructor(config: CupInfoConfig) {
		super();
		this.id = config.id;
		this.started = config.started;
		this.logo = config.logo;
		this.title = config.title;
		this.game = config.game;
		this.gameTitle = config.gameTitle;
		this.start = config.start;
		this.prizeFund = config.prizeFund;
		this.participantCount = config.participantCount;
	}

	get href() {
		return "/" + this.id;
	}

	static createByJson(json: any) {
		return new CupInfo({
			id: json["id"],
			started: json["started"],
			logo: json["logo"],
			title: json["title"],
			game: json["game"],
			gameTitle: json["gameTitle"],
			start: new Date(json["start"] * 1000),
			prizeFund: json["prize_fund"],
			participantCount: json["participants"]
		});
	}
}

export interface CupInfoConfig {
	readonly id: number;
	readonly started: boolean;
	readonly logo: string;
	readonly title: string;
	readonly game: string;
	readonly gameTitle: string;
	readonly start: Date;
	readonly prizeFund: number;
	readonly participantCount: number;
}
