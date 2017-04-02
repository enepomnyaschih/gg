import Cup from "../models/Cup";

import provider from "./provider";

export function get(id: number) {
	return provider.get([String(id), "view"], null, Cup.createByJson);
}
