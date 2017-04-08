import * as CupService from "./services/Cup";
import Application from "./ui/Application";
import MessagePanel from "./lib/ui/MessagePanel";

require("./index.styl");

$(function() {
	const cupId = +window.location.pathname.substr(1);
	if (!cupId) {
		const text = "Не указан ID турнира. Пожалуйста, перейдите на турнир " +
			"GoodGame и попробуйте применить букмарклет турнирной сетки.";
		new MessagePanel(text, {cls: "j-error j-small"}).renderTo("body");
		return;
	}
	CupService.get(cupId).then((cup) => {
		(<any>window).cup = cup;
		if (cup.gridType !== 1) {
			const text = "Похоже, этот турнир не проходит в формате Single Elimination. " +
				"Этот клиент пока поддерживает только Single Elimination. " +
				'Если турнир проходит в Single Elimination, но вы видите эту ошибку, пожалуйста, <a href="https://github.com/enepomnyaschih/gg/issues">сообщите о ней команде проекта</a>.';
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
