# Турнирная сетка для GoodGame.ru

## Installation

1. Download the repository
1. Install NodeJS
1. Run `npm install`
1. Run `bower install`

*Note:* This project requires a specific version of TypeScript, so the globally installed TypeScript compiler may be incompatible. That's why all dependencies are installed locally.

## Usage

1. If third party dependencies were updated, run `npm install` and `bower install` again
1. Run `npm run debug` or `webpack` to build the debug version
1. Run `npm run release` or `webpack --env.optimize` to build the release version

## Configuration

1. To add a new page, see **Configuration** section in `webpack.config.js`
1. To add a new JS thirdparty, see `bower.json` and `templates/base.html`
1. To add a new TS thirdparty, see `package.json`
