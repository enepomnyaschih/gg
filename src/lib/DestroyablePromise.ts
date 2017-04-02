import Destroyable from "jwidget/Destroyable";

export default class DestroyablePromise<T> implements Destroyable {
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

    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): DestroyablePromise<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => any): DestroyablePromise<U> {
		return new DestroyablePromise(this._promise.then(onFulfilled, onRejected), this);
    }

	catch<U>(onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U> {
		return new DestroyablePromise(this._promise.catch(onRejected), this);
	}
}
