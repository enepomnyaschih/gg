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

import Dictionary from "jwidget/Dictionary";

export const GOODGAME_HOSTNAME = "https://goodgame.ru";

// sizes in px
export const AVATAR_SIZE = 30;
export const PLAYER_BOTTOM_MARGIN = 2;
export const MATCH_HEIGHT = (AVATAR_SIZE + PLAYER_BOTTOM_MARGIN) * 2;
export const MATCH_GAP = 20;
export const THIRD_PLACE_MATCH_GAP = 40;
export const WINNER_LINE_OFFSET = 8;

// values
export const GRID_TYPE_SINGLE = 1;
export const GRID_TYPE_DOUBLE = 3;
export const GRID_COUNTS: Dictionary<number> = {
	"1": 1,
	"3": 2
};
export const UNHIDEABLE_COLUMN_COUNT = 2;

// other
export const REFRESH_INTERVAL = 30000;
export const GAME_ICON_MAPPING: Dictionary<string> = {
	"sc2"      : "sc-2",
	"sc2-lotv" : "sc-2",
	"wc3"      : "wc-3",
	"dota2"    : "dota-2",
	"wot"      : "wot",
	"lol"      : "lol",
	"hs"       : "hs",
	"csgo"     : "csgo",
	"hots"     : "hots",
	"rnd"      : "othergame"
};
