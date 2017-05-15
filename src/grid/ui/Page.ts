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

import Component from "jwidget/Component";
import template from "jwidget/template";
import show from "jwidget/ui/show";

import Copyright from "../../common/ui/Copyright";

import Cup from "../models/Cup";
import * as CupService from "../services/Cup";

import Grid from "./Grid";
import Headers from "./Headers";

import {GAME_ICON_MAPPING, GRID_TYPE_SINGLE} from "../../constants";

@template(require<string>("./Page.jw.html"))
export default class Page extends Component {
	private headers: Headers;
	private grid: Grid;

	constructor(private cup: Cup) {
		super();
	}

	protected renderGameIcon(el: JQuery) {
		const iconUrl = CupService.getGameIconUrl(GAME_ICON_MAPPING[this.cup.game] || "othergame");
		el.css("background-image", "url(" + iconUrl + ")");
	}

	protected renderGameName(el: JQuery) {
		el.text(this.cup.title + (this.cup.gameTitle ? (" - " + this.cup.gameTitle) : ""));
	}

	protected renderShowWinners(el: JQuery) {
		return this._renderGridLink(el, 0, "winners");
	}

	protected renderShowLosers(el: JQuery) {
		return this._renderGridLink(el, 1, "losers");
	}

	protected renderShowColumns(el: JQuery) {
		this.own(show(el, <any>this.cup.hiddenColumns));
		el.click((e) => {
			e.preventDefault();
			this.cup.hiddenColumns.set(0);
		});
	}

	protected renderDisableAlignment(el: JQuery) {
		this.own(show(el, <any>this.cup.alignBy));
		el.click((e) => {
			e.preventDefault();
			this.cup.alignBy.set(null);
		});
	}

	protected renderHeaders() {
		return this.headers = this.own(new Headers(this.cup));
	}

	protected renderGrid() {
		return this.grid = this.own(new Grid(this.cup));
	}

	protected renderCopyright() {
		return this.own(new Copyright());
	}

	protected afterAppend() {
		super.afterAppend();
		this.syncScroll();
		this.grid.el.scroll(() => this.syncScroll());
	}

	private syncScroll() {
		this.headers.el.scrollLeft(this.grid.el.scrollLeft());
	}

	private _renderGridLink(el: JQuery, index: number, link: string) {
		if (this.cup.gridType === GRID_TYPE_SINGLE) {
			return false;
		}
		if (this.cup.gridIndex === index) {
			el.addClass("g-active");
		} else {
			el.attr("href", "/" + this.cup.id + "/" + link);
		}
		return null;
	}
}
