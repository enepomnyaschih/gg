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

@template(require<string>("./Page.jw.html"))
export default class Page extends Component {
	protected renderExpander(el: JQuery) {
		el.each((index, element) => {
			index = index;
			const el = $(element);
			const expanded = new Property(false);
			show(this.getElement(el.data("target")), expanded);
			el.click((e) => {
				e.preventDefault();
				expanded.set(!expanded.get());
			});
		});
	}

	protected renderCopyright() {
		return this.own(new Copyright());
	}
}
