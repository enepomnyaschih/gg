/*
	Tournament grid
	Copyright (C) 2017  Egor Nepomnyaschih

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along
	with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import Interval from "jwidget/Interval";

import * as CupService from "./services/Cup";
import Application from "./ui/Application";
import MessagePanel from "./lib/ui/MessagePanel";

import {GRID_COUNTS, REFRESH_INTERVAL} from "./constants";

require("./index.styl");

$(function() {
	const matches = /^\/(\d+)(\/.*)?$/.exec(window.location.pathname);
	if (!matches) {
		const text = "Не указан ID турнира. Пожалуйста, перейдите на турнир " +
			"GoodGame и попробуйте применить букмарклет турнирной сетки.";
		new MessagePanel(text, {cls: "j-error j-small"}).renderTo("body");
		return;
	}
	const cupId = +matches[1];
	const gridIndex = (matches[2] === "/losers") ? 1 : 0;
	CupService.get(cupId, gridIndex).then((cup) => {
		(<any>window).cup = cup;
		if (!GRID_COUNTS.hasOwnProperty(String(cup.gridType))) {
			const text = "Похоже, сетка этого турнира имеет неподдерживаемый формат. " +
				"Этот клиент пока поддерживает только Single Elimination и Double Elimination. " +
				'Если турнир проходит в одном из этих форматов, но вы видите эту ошибку, пожалуйста, <a href="https://github.com/enepomnyaschih/gg/issues">сообщите о ней команде проекта</a>.';
			new MessagePanel(text, {cls: "j-error j-small", html: true}).renderTo("body");
			return;
		}

		const application = new Application(cup);
		application.renderTo("body");

		(<any>window).application = application;

		new Interval(() => {
			CupService.get(cupId, gridIndex).then((newCup) => {
				cup.update(newCup);
			});
		}, REFRESH_INTERVAL);
	}, () => {
		const text = "Не удалось загрузить и прочитать данные турнира. " +
			"Возможно, турнир с таким ID не существует или он не проходит в формате Single Elimination. " +
			'Если это не так, пожалуйста, <a href="https://github.com/enepomnyaschih/gg/issues">сообщите об ошибке команде проекта</a>.';
		new MessagePanel(text, {cls: "j-error j-small", html: true}).renderTo("body");
	});
});
