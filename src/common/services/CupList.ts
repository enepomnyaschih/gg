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

import CupInfo from "../models/CupInfo";
import CupList from "../models/CupList";

import provider from "../../common/RestProvider";

export function get() {
	return provider.get("list", null, (json) => CupList.createByJson(json));
}

export function past(page: number) {
	return provider.get("past", {page: page}, (json) => (<any[]>json).map(CupInfo.createByJson));
}
