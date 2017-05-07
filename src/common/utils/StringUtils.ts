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

export function plural(value: number, single: string, bunch: string, many: string): string {
	const value100 = value % 100;
	if (value100 >= 10 && value <= 20) {
		return value + " " + many;
	}
	const value10 = value % 10;
	if (value10 === 1) {
		return value + " " + single;
	}
	return value + " " + bunch;
}
