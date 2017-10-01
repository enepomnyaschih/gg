import {isNotNil} from "jwidget/Core";

export function combine(...functions: (() => any)[]) {
	functions = functions.filter(isNotNil);
	return function() {
		for (let i = 0; i < functions.length; ++i) {
			functions[i].apply(this, arguments);
		}
	};
}
