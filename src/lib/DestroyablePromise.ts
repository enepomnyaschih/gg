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

import Destroyable from "jwidget/Destroyable";
import IDestroyablePromise from "./IDestroyablePromise";

export default class DestroyablePromise<T> implements IDestroyablePromise<T> {
	//private _promise: Promise<T>;

	constructor(private _promise: Promise<T>, private baseDestroyable?: Destroyable) {
		//this._promise = promise;//new Promise((resolve, reject) => promise.then(resolve, reject));
	}

	get promise() {
		return this._promise;
	}

	destroy() {
		if (this.baseDestroyable) {
			this.baseDestroyable.destroy();
		}
	}

	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): IDestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): IDestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => any): IDestroyablePromise<U> {
		return new DestroyablePromise(this._promise.then(onFulfilled, onRejected), this);
	}

	catch<U>(onRejected?: (error: any) => U | Thenable<U>): IDestroyablePromise<U> {
		return new DestroyablePromise(this._promise.catch(onRejected), this);
	}
}
