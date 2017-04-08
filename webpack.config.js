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
	HtmlWebpackPlugin = require("html-webpack-plugin");

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
				exclude: ['bower_components', 'backend', '.htaccess', 'index.html']
			}),
			new webpack.optimize.CommonsChunkPlugin({name: "common", filename: "common.js"})
		]/*.concat(Object.keys(pages).map(function(id) {
			return new HtmlWebpackPlugin({
				chunks: ["common", id],
				filename: id + ".html",
				template: "!!html-webpack-plugin/lib/loader.js!./templates/base.html",
				inject: "body",
				title: pages[id].title,
				suffix: optimize ? ".min" : ""
			});
		}))*/.concat(optimize ? [
			new webpack.optimize.UglifyJsPlugin({
				minimize: true
			})
		] : [])
	};
};
