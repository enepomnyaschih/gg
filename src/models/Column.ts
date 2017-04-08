import Class from "jwidget/Class";
import Dictionary from "jwidget/Dictionary";
import JWArray from "jwidget/JWArray";
import Property from "jwidget/Property";

import Cup from "./Cup";
import Match from "./Match";
import Participant from "./Participant";

import {MATCH_GAP, MATCH_HEIGHT} from "../constants";

export default class Column extends Class {
	index: number;
	cup: Cup;
	matches: JWArray<Match>;
	bo: number;
	superfinal: boolean = false;
	visible: Property<boolean>;
	gap: Property<number>;
	offset: Property<number>;

	constructor(config: ColumnConfig) {
		super();

		this.index = config.index;
		this.cup = config.cup;
		this.matches = new JWArray(config.matches);
		this.bo = config.bo;
		this.superfinal = config.superfinal;
		this.visible = this.own(this.cup.hiddenColumns.mapValue((hiddenColumns) => this.index >= hiddenColumns));

		this.gap = this.own(this.cup.hiddenColumns.mapValue((hiddenColumns) => {
			let index = this.index;
			if (this.superfinal) {
				--index;
			}
			if (this.cup.gridIndex === 1) {
				index = Math.floor(index / 2) - Math.floor(hiddenColumns / 2);
			} else {
				index -= hiddenColumns;
			}
			return Math.pow(2, index) * (MATCH_HEIGHT + MATCH_GAP) - MATCH_HEIGHT;
		}));
		this.offset = this.own(this.gap.mapValue((gap) => gap / 2));
	}

	get title() {
		if (this.superfinal) {
			return "Суперфинал";
		}
		if (this.cup.gridIndex === 1) {
			return "";
		}
		switch (this.matches.getLength()) {
			case 1: return "Финал";
			case 2: return "Полуфинал";
			default: return "1/" + this.matches.getLength();
		}
	}

	get fullTitle() {
		return (this.cup.gridIndex === 1) ? ("Bo" + this.bo) : (this.title + ", Bo" + this.bo);
	}

	get next() {
		return this.cup.grid.get(this.index + 1);
	}

	get prev() {
		return this.cup.grid.get(this.index - 1);
	}

	get maxScore() {
		return (this.bo + 1) / 2;
	}

	static createByJson(json: any, index: number, cup: Cup, participants: Dictionary<Participant>, superfinal: boolean) {
		const column = new Column({
			index: index,
			cup: cup,
			bo: +json["bo"],
			superfinal: superfinal
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
	superfinal: boolean;
}
