# Турнирная сетка для GoodGame.ru

## Installation

1. Download the repository
1. Install NodeJS
1. Run `npm run setup`

## Usage

1. If new third party dependencies were added, run `npm run setup`
1. Run `npm run debug` or `webpack` to build the debug version
1. Run `npm run release` or `webpack --env.optimize` to build the release version

## Configuration

1. To add a new page, see **Configuration** section in `webpack.config.js`
1. To add a new JS thirdparty, see `bower.json` and `templates/base.html`
1. To add a new TS thirdparty, see `package.json`

## Как открыть эту сетку для любого турнира на GoodGame.ru

Создайте закладку в браузере, в качестве URL укажите следующий код:

	javascript:(function(l){var m=/^\/cup\/(\d+)/.exec(l.pathname);m?(location.href="http://ggcup.ru/"+m[1]):alert("Перейдите на турнир GoodGame и попробуйте снова.")})(location)
