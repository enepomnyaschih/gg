export function create(y?: number, m?: number, d?: number, h?: number, i?: number, s?: number, z?: number, utc?: boolean) {
	return utc ? new Date(Date.UTC(y, m, d, h, i, s, z)) : new Date(y, m, d, h, i, s, z);
}

export function parse(str: string, utc?: boolean) {
	if (!str) {
		return null;
	}

	var parts = str.match(/(\d+)/g);
	parts[3] = parts[3] || "0";
	parts[4] = parts[4] || "0";
	parts[5] = parts[5] || "0";
	parts[6] = parts[6] || "0";
	return create(+parts[0], +parts[1] - 1, +parts[2], +parts[3], +parts[4], +parts[5], +parts[6], utc);
}
