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
import Property from "jwidget/Property";

import {GOODGAME_HOSTNAME} from "../../constants";

export default class Participant extends Class {
	id: number;
	checkin: boolean;
	name: string;
	avatar: string;
	contact: string;
	rating: number;
	aligned = new Property<boolean>(false);

	constructor(config: ParticipantConfig) {
		super();
		this.id = config.id;
		this.checkin = config.checkin;
		this.name = config.name;
		this.avatar = config.avatar;
		this.contact = config.contact;
		this.rating = config.rating;
	}

	get link() {
		return GOODGAME_HOSTNAME + "/user/" + this.id;
	}

	static createByJson(json: any) {
		const avatarMatches = /^\/files\/avatars\/(.*)$/.exec(json["avatar"]);
		return new Participant({
			id: +json["id"],
			checkin: json["checkin"],
			name: json["name"],
			avatar: avatarMatches ? avatarMatches[1] : "avatar.png",
			contact: json["contact"],
			rating: json["rating"]
		});
	}
}

export interface ParticipantConfig {
	id: number;
	checkin: boolean;
	name: string;
	avatar: string;
	contact: string;
	rating: number;
}
