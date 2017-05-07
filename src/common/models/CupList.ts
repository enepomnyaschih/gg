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

import * as ArrayUtils from "jwidget/ArrayUtils";
import Class from "jwidget/Class";
import JWArray from "jwidget/JWArray";

import CupInfo from "./CupInfo";

export default class CupList extends Class {
	readonly opened = new JWArray<CupInfo>();
	readonly started = new JWArray<CupInfo>();

	constructor(config?: CupListConfig) {
		super();
		config = config || {};
		this.opened.addAll(config.opened || []);
		this.started.addAll(config.started || []);
	}

	static createByJson(json: any) {
		return new CupList({
			opened: ArrayUtils.toSorted((<any[]>json["opened"]).map(CupInfo.createByJson), (cupInfo) => cupInfo.start),
			started: ArrayUtils.toSorted((<any[]>json["started"]).map(CupInfo.createByJson), (cupInfo) => cupInfo.start)
		});
	}
}

export interface CupListConfig {
	readonly opened?: CupInfo[];
	readonly started?: CupInfo[];
}
