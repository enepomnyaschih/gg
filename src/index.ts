import * as CupService from "./services/Cup";
import Application from "./ui/Application";

require("./index.styl");

$(function() {
	CupService.get(5284).then((cup) => {
		(<any>window).cup = cup;

		const application = new Application(cup);
		application.renderTo("body");

		(<any>window).application = application;
	});
});
