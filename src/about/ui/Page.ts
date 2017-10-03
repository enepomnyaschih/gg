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
import Property from "jwidget/Property";
import template from "jwidget/template";
import show from "jwidget/ui/show";

import Copyright from "../../common/ui/Copyright";

import {localized} from "../../locale";

@localized
@template(require<string>("./Page.jw.html"))
export default class Page extends Component {
	protected renderCopyright() {
		return this.own(new Copyright());
	}

	protected afterRender() {
		super.afterRender();
		this.el.find(".gg-expander").each((index, element) => {
			index = index;
			const el = $(element);
			const expanded = new Property(false);
			show(this.getElement(el.attr("data-target")), expanded);
			el.click((e) => {
				e.preventDefault();
				expanded.set(!expanded.get());
			});
		});
	}

	private get author() {
		return '<a href="https://goodgame.ru/channel/Egor_N/">';
	}

	private get gg() {
		return '<a href="https://goodgame.ru">';
	}

	private get gnu() {
		return '<a href="https://www.gnu.org/licenses/quick-guide-gplv3.html">';
	}

	private get expander1() {
		return '<a class="gg-expander" data-target="expanded-1" href="#">';
	}

	private get endlink() {
		return '</a>';
	}
}
