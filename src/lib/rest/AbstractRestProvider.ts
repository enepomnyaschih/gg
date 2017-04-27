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

import RestFactory from "./RestFactory";
import RestRequest from "./RestRequest";

abstract class AbstractRestProvider<C> {
	private mock: Dictionary<string>;
	private url: string;
	private urlBuilder: (action: string) => string;
	private settings: JQueryAjaxSettings;

	constructor(config?: AbstractRestProviderConfig) {
		config = config || {};
		this.mock = config.mock || {};
		this.url = config.url || "${action}";
		this.urlBuilder = config.urlBuilder;
		this.settings = config.settings;
	}

	abstract getHeaders(config: C): Dictionary<string>;

	abstract getContentType(config: C): string;

	getUrl(action: string | string[], type: string = "GET") {
		if (typeof action !== 'string') {
			if (action.some(_.isNil)) {
				console.error("URL ", action, " contains blank parts - it may cause improper API request to be sent. Rejecting the request.");
				return null;
			}
			action = action.map(encodeURIComponent).join('/');
		}
		return this.mock[type + ' ' + action] || this.mock[action] ||
			(this.urlBuilder ? this.urlBuilder(action) : this.url.replace("${action}", action));
	}

	get<T>(action: string | string[], data?: any, factory?: RestFactory<T>, config?: C) {
		return this.send(action, data, config, "GET", factory);
	}

	post(action: string | string[], data?: any, config?: C) {
		return this.send(action, data, config, "POST");
	}

	put(action: string | string[], data?: any, config?: C) {
		return this.send(action, data, config, "PUT");
	}

	patch(action: string | string[], data?: any, config?: C) {
		return this.send(action, data, config, "PATCH");
	}

	del(action: string | string[], data?: any, config?: C) {
		return this.send(action, data, config, "DELETE");
	}

	upload(action: string | string[], data?: any, config?: C) {
		return this.send(action, data, config, "POST", null, {
			processData: false,
			contentType: false
		});
	}

	private send<T>(action: string | string[], data: any, config: C, type: string, factory?: RestFactory<T>, settings?: JQueryAjaxSettings): RestRequest<T> {
		const url = this.getUrl(action, type);
		if (url === null) {
			return new RestRequest<T>();
		}
		const contentType = (settings && settings.contentType != null) ?
			settings.contentType : this.getContentType(config);
		settings = $.extend({}, this.settings, settings, {
			url: url,
			type: type,
			headers: this.getHeaders(config),
			contentType: contentType,
			data: (contentType === "application/json" && data != null) ? JSON.stringify(data) : data
		});
		return new RestRequest<T>($.ajax(settings), factory);
	}
}

export default AbstractRestProvider;

export interface AbstractRestProviderConfig {
	url?: string;
	urlBuilder?: (action: string) => string;
	mock?: Dictionary<string>;
	settings?: JQueryAjaxSettings;
}

// export interface RestSendOptions<T, C> {
// 	action: string | string[];
// 	data: any;
// 	config: C;
// 	type: string;
// 	factory?: RestFactory<T>;
// }

// export interface RestPage<T> {
// 	response: any;
// 	data: T[];
// }

// var defaultCodeToMessageMapping = {
// 	'400': function(json) {
// 		if (!json || !json.message) {
// 			return 'BAD_REQUEST';
// 		}
// 		if (/This file is not a valid image/i.test(json.message)) {
// 			return ['INVALID_FILE_FORMAT', {formats: constants.imageAllowedFileTypes}];
// 		}
// 		if (/The mime type of the file is invalid/i.test(json.message)) {
// 			return ['INVALID_FILE_FORMAT', {formats: constants.contactsAllowedFileTypes}];
// 		}
// 		var matches = [];
// 		/* jshint boss:true */
// 		if (matches = /Allowed maximum size is ([^\.]+)\./.exec(json.message)) {
// 			return ['MAX_SIZE_EXCEEDED', {max: matches[1]}];
// 		}
// 		if (matches = /Allowed maximum width is ([^\.]+)\./.exec(json.message)) {
// 			return ['MAX_IMAGE_WIDTH', {max: matches[1]}];
// 		}
// 		if (matches = /Minimum width expected is ([^\.]+)\./.exec(json.message)) {
// 			return ['MIN_IMAGE_WIDTH', {min: matches[1]}];
// 		}
// 		if (matches = /Allowed maximum height is ([^\.]+)\./.exec(json.message)) {
// 			return ['MAX_IMAGE_HEIGHT', {max: matches[1]}];
// 		}
// 		if (matches = /Minimum height expected is ([^\.]+)\./.exec(json.message)) {
// 			return ['MIN_IMAGE_HEIGHT', {min: matches[1]}];
// 		}
// 		return 'BAD_REQUEST';
// 	},
// 	'401': 'UNAUTHORIZED',
// 	'403': 'NOT_PERMITTED',
// 	'404': 'OBJECT_DOES_NOT_EXIST',
// 	'409': 'OBJECT_HAS_BEEN_UPDATED',
// 	'500': 'INTERNAL_ERROR',
// 	'503': 'SERVER_IS_DOWN'
// };

// function makeErrorHandler(codeToMessageMapping) {
// 	return function(request) {
// 		handleError(request, codeToMessageMapping);
// 		return $.Deferred().reject(request).promise();
// 	};
// }

// function handleError(request, codeToMessageMapping) {
// 	codeToMessageMapping = codeToMessageMapping || {};
// 	if (!request || request.status === 0) {
// 		// Request aborted
// 		return;
// 	}
// 	var messageKey = codeToMessageMapping[request.status] || defaultCodeToMessageMapping[request.status];
// 	if (typeof messageKey === 'function') {
// 		messageKey = messageKey(request.responseJSON);
// 	}
// 	var values = {code: request.status};
// 	if (JW.isArray(messageKey)) {
// 		JW.apply(values, messageKey[1]);
// 		messageKey = messageKey[0];
// 	}
// 	var message =
// 		messageKey ? Locale.get(['API_ERROR', messageKey], values) :
// 		(request.data && request.data.message) ? request.data.message :
// 		Locale.get('API_ERROR.UNKNOWN_ERROR', values);
// 	Popup.show(message, null, true);
// }
