/*
	Tournament grid
	Copyright (C) 2017  Egor Nepomnyaschih

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along
	with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
