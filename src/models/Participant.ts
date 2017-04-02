import Class from "jwidget/Class";

export default class Participant extends Class {
	id: number;
	checkin: boolean;
	name: string;
	avatar: string;
	contact: string;
	rating: number;

	constructor(config: ParticipantConfig) {
		super();
		this.id = config.id;
		this.checkin = config.checkin;
		this.name = config.name;
		this.avatar = config.avatar;
		this.contact = config.contact;
		this.rating = config.rating;
	}

	static createByJson(json: any) {
		return new Participant({
			id: +json["id"],
			checkin: json["checkin"],
			name: json["name"],
			avatar: json["avatar"],
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
