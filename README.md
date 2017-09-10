# Linden Honey Bot

> Telegram Bot powered by Koa.js and Telegraf

[![node version][node-image]][node-url]
[![build status][travis-image]][travis-url]
[![release][release-image]][release-url]
[![downloads][downloads-image]][release-url]
[![license][license-image]][license-url]

[node-image]: https://img.shields.io/badge/node-7.6.x-brightgreen.svg?style=flat-square
[node-url]: https://nodejs.org/en/download/
[release-image]: https://img.shields.io/github/release/linden-honey/linden-honey-bot.svg?style=flat-square
[release-url]: https://github.com/linden-honey/linden-honey-bot/releases
[downloads-image]: https://img.shields.io/github/downloads/linden-honey/linden-honey-bot/latest/total.svg?style=flat-square
[downloads-url]: https://github.com/linden-honey/linden-honey-bot/releases
[travis-image]: https://img.shields.io/travis/linden-honey/linden-honey-bot/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/linden-honey/linden-honey
[license-image]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square
[license-url]: https://github.com/linden-honey/linden-honey-bot/blob/master/LICENSE

Telegram bot built on top of Linden Honey REST API

## Technologies

* [Yarn](https://yarnpkg.com/lang/en/)
* [Koa.js](https://koajs.com/)
* [Telegraf](http://telegraf.js.org/)

## Usage

### Local

The following environment variables should be exported before running or you can create file `config/linden_honey.json` with the same structure:
* `LH_APP_API_URL`
* `LH_APP_TELEGRAM_BOT_TOKEN`
* `LH_LB_URL`

Start application:
```
yarn start
```

Start application in debug mode:
```
yarn debug
```

## Telegram bot instance

[https://telegram.me/BolshevikBot](https://telegram.me/BolshevikBot)
