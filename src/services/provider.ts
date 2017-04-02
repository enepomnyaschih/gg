import Dictionary from "jwidget/Dictionary";

import {default as AbstractRestProvider, AbstractRestProviderConfig} from "../lib/rest/AbstractRestProvider";

import {GOODGAME_API} from "../constants";

interface Config {}

class Provider extends AbstractRestProvider<Config> {

	constructor(config?: AbstractRestProviderConfig) {
		super(config);
	}

	getHeaders(): Dictionary<string> {
		return {};
	}

	getContentType(): string {
		return "application/json";
	}
}

export default new Provider({
	url: GOODGAME_API + "/ajax/cups/${action}",
	settings: {
		dataType: "json"
	}
});
