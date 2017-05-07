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

import Dictionary from "jwidget/Dictionary";

import {default as AbstractRestProvider, AbstractRestProviderConfig} from "../lib/rest/AbstractRestProvider";

interface Config {}

class RestProvider extends AbstractRestProvider<Config> {

	constructor(config?: AbstractRestProviderConfig) {
		super(config);
	}

	getHeaders(): Dictionary<string> {
		return {};
	}

	getContentType(): string {
		return "application/x-www-form-urlencoded";
	}
}

export default new RestProvider({
	url: "/api/${action}.php",
	settings: {
		dataType: "json"
	}
});
