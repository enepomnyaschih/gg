import * as CupService from "./services/Cup";
import Application from "./ui/Application";
import MessagePanel from "./lib/ui/MessagePanel";

import {GRID_COUNTS} from "./constants";

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
	}, () => {
		const text = "Не удалось загрузить и прочитать данные турнира. " +
			"Возможно, турнир с таким ID не существует или он не проходит в формате Single Elimination. " +
			'Если это не так, пожалуйста, <a href="https://github.com/enepomnyaschih/gg/issues">сообщите об ошибке команде проекта</a>.';
		new MessagePanel(text, {cls: "j-error j-small", html: true}).renderTo("body");
	});
});
