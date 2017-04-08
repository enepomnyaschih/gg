import * as CupService from "./services/Cup";
import Application from "./ui/Application";

require("./index.styl");

$(function() {
	const cupId = +window.location.pathname.substr(1);
	CupService.get(cupId).then((cup) => {
		(<any>window).cup = cup;

		const application = new Application(cup);
		application.renderTo("body");

		(<any>window).application = application;
	});
});
