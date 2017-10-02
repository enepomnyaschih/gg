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

import Interval from "jwidget/Interval";
import * as MapUtils from "jwidget/MapUtils";

import Application from "../common/ui/Application";
import * as CupService from "./services/Cup";
import Page from "./ui/Page";
import MessagePanel from "../lib/ui/MessagePanel";
import locale from "../locale";

import {GRID_COUNTS, REFRESH_INTERVAL} from "../constants";

require("./grid.styl");

$(function() {
	const matches = /^\/(\d+)(\/[^\/]*)?/.exec(window.location.pathname);
	if (!matches) {
		const text = locale("ERROR_INVALID_CUP_ID");
		new MessagePanel(text, {cls: "j-error j-small"}).renderTo("body");
		return;
	}
	const cupId = +matches[1];
	const gridIndex = (matches[2] === "/losers") ? 1 : 0;
	CupService.get(cupId, gridIndex).then((cup) => {
		(<any>window).cup = cup;
		if (!GRID_COUNTS.hasOwnProperty(String(cup.gridType))) {
			const text = locale("ERROR_INVALID_GRID_TYPE", {
				link: '<a href="https://github.com/enepomnyaschih/gg/issues">',
				endlink: '</a>'
			});
			new MessagePanel(text, {cls: "j-error j-small", html: true}).renderTo("body");
			return;
		}

		const gridName = (gridIndex === 1) ? "losers" : "winners";
		const application = new Application("cup/" + cupId + "/grid/" + gridName, new Page(cup)).ownPage();
		application.renderTo("body");

		(<any>window).application = application;

		const hash = location.hash.substr(1);
		const participant = MapUtils.search(cup.participants, (participant) => participant.name === hash);
		if (participant) {
			cup.alignBy.set(participant);
		}

		new Interval(() => {
			CupService.get(cupId, gridIndex).then((newCup) => {
				cup.update(newCup);
				newCup.destroy();
			});
		}, REFRESH_INTERVAL);
	}, () => {
		const text = locale("ERROR_UNABLE_TO_LOAD", {
			link: '<a href="https://github.com/enepomnyaschih/gg/issues">',
			endlink: '</a>'
		});
		new MessagePanel(text, {cls: "j-error j-small", html: true}).renderTo("body");
	});
});
