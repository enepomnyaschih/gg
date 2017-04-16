/*
	Tournament grid
	Copyright (C) 2017  Egor Nepomnyaschih

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along
	with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Configuration */

var pages = {
	"index": {
		source: "./index.ts",
		title: "Турнирная сетка для GoodGame.ru"
	}
};

/* Building script */

var path = require("path"),
	webpack = require("webpack"),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	HtmlWebpackPrefixPlugin = require("html-webpack-prefix-plugin");

var entry = {};
for (var id in pages) {
	entry[id] = pages[id].source;
}

module.exports = function(env) {
	var optimize = env && env.optimize;

	return {
		context: path.resolve(__dirname, "src"),
		entry: entry,

		output: {
			path: path.resolve(__dirname, "public"),
			filename: "[name].js"
		},

		devtool: optimize ? undefined : "source-map",

		resolve: {
			extensions: [".webpack.js", ".web.js", ".ts", ".js"]
		},

		module: {
			rules: [
				{ test: /\.ts$/, loader: "ts-loader" },
				{ test: /\.css$/, use: ["style-loader", "css-loader"] },
				{ test: /\.styl$/, use: ["style-loader", "css-loader", "stylus-loader"] },
				{ test: /\.html$/, loader: "html-loader", query: {minimize: true, attrs: false} },
				{ test: /\.png$/, loader: "url-loader", options: {limit: 32768} },
				{ test: /\.jpg$/, loader: "url-loader", options: {limit: 32768} },
				{ test: /\.js$/, loader: optimize ? "webpack-strip-block" : "source-map-loader", enforce: "pre" }
			]
		},

		plugins: [
			new CleanWebpackPlugin(['public'], {
				exclude: ['bower_components', 'backend', '.htaccess', 'goodgame.php']
			}),
			new webpack.optimize.CommonsChunkPlugin({name: "common", filename: "common.js"})
		].concat(Object.keys(pages).map(function(id) {
			return new HtmlWebpackPlugin({
				chunks: ["common", id],
				filename: id + ".html",
				template: "!!html-webpack-plugin/lib/loader.js!./templates/base.html",
				inject: "body",
				title: pages[id].title,
				prefix: "/",
				suffix: optimize ? ".min" : ""
			});
		})).concat([
			new HtmlWebpackPrefixPlugin()
		]).concat(optimize ? [
			new webpack.optimize.UglifyJsPlugin({
				minimize: true
			})
		] : [])
	};
};
