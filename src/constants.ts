import Dictionary from "jwidget/Dictionary";

export const GOODGAME_API = "/gg-api";
export const GOODGAME_HOSTNAME = "https://goodgame.ru";

// sizes in px
export const AVATAR_SIZE = 30;
export const PLAYER_BOTTOM_MARGIN = 2;
export const MATCH_HEIGHT = (AVATAR_SIZE + PLAYER_BOTTOM_MARGIN) * 2;
export const MATCH_GAP = 20;
export const WINNER_LINE_OFFSET = 8;

// values
export const GRID_TYPE_SINGLE = 1;
export const GRID_TYPE_DOUBLE = 3;
export const GRID_COUNTS: Dictionary<number> = {
	"1": 1,
	"3": 2
};
export const UNHIDEABLE_COLUMN_COUNT = 2;
