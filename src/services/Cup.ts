import Cup from "../models/Cup";

import provider from "./provider";

export function get(id: number, gridIndex: number) {
	return provider.get([String(id), "view"], null, (json) => Cup.createByJson(json, gridIndex));
}
