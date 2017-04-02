import Cup from "./models/Cup";
import * as CupService from "./services/Cup";
import Application from "./ui/Application";

require("./index.styl");

let cup: Cup;
let application: Application;

$(function() {
	CupService.get(5284).then((cup_) => {
		cup = cup_;
		application = new Application(cup);
		application.renderTo("body");
	});
});
