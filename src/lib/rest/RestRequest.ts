import Destroyable from "jwidget/Destroyable";

import DestroyablePromise from "../DestroyablePromise";
import RestFactory from "./RestFactory";

export default class RestRequest<T> implements Destroyable {
	private aborted = false;
	private _promise: Promise<T>;

	constructor(private xhr?: JQueryXHR, private factory?: RestFactory<T>) {
		this._promise = new Promise<T>((resolve, reject) => {
			if (!this.xhr) {
				reject();
			}
			this.xhr.then((response) => {
				resolve(this.factory ? this.factory(response) : response);
			}, (request) => {
				if (!this.aborted) {
					reject(request);
				}
			});
		});
	}

	get promise() {
		return this._promise;
	}

	destroy() {
		this.aborted = true;
		this.xhr.abort();
	}

    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): DestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => any) {
		return new DestroyablePromise(this._promise.then(onFulfilled, onRejected), this);
	}

	catch<U>(onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U> {
		return new DestroyablePromise(this._promise.catch(onRejected), this);
	}
}
