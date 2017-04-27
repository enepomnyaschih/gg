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
import Dictionary from "jwidget/Dictionary";
import Functor from "jwidget/Functor";
import JWArray from "jwidget/JWArray";
import Property from "jwidget/Property";

import Cup from "./Cup";
import Match from "./Match";
import Participant from "./Participant";

import {GRID_TYPE_DOUBLE, MATCH_GAP, MATCH_HEIGHT} from "../constants";

export default class Column extends Class {
	index: number;
	cup: Cup;
	matches: JWArray<Match>;
	bo: number;
	superfinal: boolean = false;
	visible: Property<boolean>;
	visibleIndex: Property<number>;
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

		this.visibleIndex = this.own(this.cup.hiddenColumns.mapValue((hiddenColumns) => {
			if (this.cup.gridIndex === 1) {
				return Math.floor(this.index / 2) - Math.floor(hiddenColumns / 2);
			}
			return this.index - hiddenColumns - (this.superfinal ? 1 : 0);
		}));
		this.gap = this.own(this.visibleIndex.mapValue((visibleIndex) => {
			return Math.pow(2, visibleIndex) * (MATCH_HEIGHT + MATCH_GAP) - MATCH_HEIGHT;
		}));

		// rely on the fact that visibleIndex and gap are already computed
		this.offset = this.own(new Functor([this.cup.alignBy], (alignBy) => {
			if (!alignBy) {
				return this.gap.get() / 2;
			}
			const firstMatchIndex = this.cup.getParticipantVerticalIndex(alignBy);
			if (firstMatchIndex === undefined) {
				return this.gap.get() / 2;
			}
			const currentMatchIndex = Math.floor(firstMatchIndex / Math.pow(2, this.visibleIndex.get()));
			return MATCH_GAP / 2 +
				firstMatchIndex * (MATCH_HEIGHT + MATCH_GAP) -
				(this.gap.get() + MATCH_HEIGHT) * currentMatchIndex;
		})).watch(this.cup.hiddenColumns).target;
	}

	get title() {
		if (this.cup.gridIndex === 1) {
			return "";
		}
		const columnsRemaining = this.cup.grid.getLength() - this.index -
			(this.cup.gridType === GRID_TYPE_DOUBLE && this.cup.gridIndex === 0 ? 1 : 0)
		switch (columnsRemaining) {
			case 0: return "Суперфинал";
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

	update(column: Column) {
		this.matches.each((match, index) => {
			match.update(column.matches.get(index));
		})
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
