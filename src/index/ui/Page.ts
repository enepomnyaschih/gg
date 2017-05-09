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
import Destroyable from "jwidget/Destroyable";
import Functor from "jwidget/Functor";
import Property from "jwidget/Property";
import template from "jwidget/template";
import show from "jwidget/ui/show";

import CupList from "../../common/models/CupList";
import * as CupListService from "../../common/services/CupList";
import Copyright from "../../common/ui/Copyright";

import CupTable from "./CupTable";

@template(require<string>("./Page.jw.html"))
export default class Page extends Component {
	private pastRequest = this.own(new Property<Destroyable>()).ownValue();
	private lastPage = 0;

	constructor(readonly cupList: CupList) {
		super();
	}

	protected renderStarted() {
		return this.own(new CupTable(this.cupList.started, false));
	}

	protected renderOpened() {
		return this.own(new CupTable(this.cupList.opened, true));
	}

	protected renderPast() {
		return this.own(new CupTable(this.cupList.past, true));
	}

	protected renderMore(el: JQuery) {
		const noRequest = this.own(new Functor([this.pastRequest], (request) => !request)).target;
		this.own(show(el, noRequest));
		el.click(() => this.loadMore());
	}

	protected renderMoreIndicator(el: JQuery) {
		this.own(show(el, <any>this.pastRequest));
	}

	protected renderCopyright() {
		return this.own(new Copyright());
	}

	protected afterRender() {
		super.afterRender();
		this.loadMore();
	}

	private loadMore() {
		if (this.pastRequest.get()) {
			return;
		}
		this.pastRequest.set(CupListService.past(++this.lastPage).then((cups) => {
			this.pastRequest.set(null);
			this.cupList.past.addAll(cups);
		}));
	}
}
