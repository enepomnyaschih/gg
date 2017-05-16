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

/* Configuration */

var pages = {
	"about": {
		source: "./about/about.ts"
	},
	"grid": {
		source: "./grid/grid.ts"
	},
	"index": {
		source: "./index/index.ts"
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

var ga =
	"<script>" +
		"(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
		"(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
		"m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
		"})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');" +
		"ga('create', 'UA-99267631-1', 'auto');" +
		"ga('send', 'pageview');" +
	"</script>";

module.exports = function(env) {
	var optimize = env && env.optimize;

	return {
		context: path.resolve(__dirname, "src"),
		entry: entry,

		output: {
			path: path.resolve(__dirname, "public"),
			filename: "bundle-[name]-[hash].js"
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
			new CleanWebpackPlugin(['public/*.html', 'public/*.js', 'public/*.map']),
			new webpack.optimize.CommonsChunkPlugin({name: "common", filename: "common-[hash].js"})
		].concat(Object.keys(pages).map(function(id) {
			return new HtmlWebpackPlugin({
				chunks: ["common", id],
				filename: id + ".html",
				template: "!!html-webpack-plugin/lib/loader.js!./templates/index.html",
				inject: "body",
				prefix: "/",
				suffix: optimize ? ".min" : "",
				dc: new Date().getTime(),
				ga: optimize ? ga : ""
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
