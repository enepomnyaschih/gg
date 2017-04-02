import Class from "jwidget/Class";
import Dictionary from "jwidget/Dictionary";
import JWArray from "jwidget/JWArray";

import Match from "./Match";
import Participant from "./Participant";

export default class Column extends Class {
	index: number;
	matches: JWArray<Match>;
	bo: number;

	constructor(config: ColumnConfig) {
		super();
		this.index = config.index;
		this.matches = new JWArray(config.matches);
		this.bo = config.bo;
	}

	static createByJson(json: any, index: number, participants: Dictionary<Participant>) {
		return new Column({
			index: index,
			matches: (<any[]>json["matches"]).map((json) => Match.createByJson(json, participants)),
			bo: +json["bo"]
		});
	}
}

export interface ColumnConfig {
	index: number;
	matches: Match[];
	bo: number;
}
