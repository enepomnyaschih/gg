import Dictionary from "jwidget/Dictionary";

import {default as AbstractRestProvider, AbstractRestProviderConfig} from "../lib/rest/AbstractRestProvider";

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
	url: "gg-api/ajax/cups/${action}",
	settings: {
		dataType: "json"
	}
});
