import Class from "jwidget/Class";
import Dictionary from "jwidget/Dictionary";
import JWArray from "jwidget/JWArray";

import Cup from "./Cup";
import Match from "./Match";
import Participant from "./Participant";

import {MATCH_GAP, MATCH_HEIGHT} from "../constants";

export default class Column extends Class {
	index: number;
	cup: Cup;
	matches: JWArray<Match>;
	bo: number;

	constructor(config: ColumnConfig) {
		super();
		this.index = config.index;
		this.cup = config.cup;
		this.matches = new JWArray(config.matches);
		this.bo = config.bo;
	}

	get title() {
		switch (this.matches.getLength()) {
			case 1: return "Финал";
			case 2: return "Полуфинал";
			default: return "1/" + this.matches.getLength();
		}
	}

	get fullTitle() {
		return this.title + ", Bo" + this.bo;
	}

	get next() {
		return this.cup.grid.get(this.index + 1);
	}

	get prev() {
		return this.cup.grid.get(this.index - 1);
	}

	get offset() {
		return this.gap / 2;
	}

	get gap() {
		return Math.pow(2, this.index) * (MATCH_HEIGHT + MATCH_GAP) - MATCH_HEIGHT;
	}

	static createByJson(json: any, index: number, cup: Cup, participants: Dictionary<Participant>) {
		const column = new Column({
			index: index,
			cup: cup,
			bo: +json["bo"]
		});
		column.matches.addAll((<any[]>json["matches"]).map((json, index) => Match.createByJson(json, column, index, participants)));
		return column;
	}
}

export interface ColumnConfig {
	index: number;
	cup: Cup;
	matches?: Match[];
	bo: number;
}
