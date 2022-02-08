# Linden Honey Bot

> Telegram bot built on top of lyrics API

[![build](https://img.shields.io/github/workflow/status/linden-honey/linden-honey-bot-nodejs/CI)](https://github.com/linden-honey/linden-honey-bot-nodejs/actions?query=workflow%3ACI)
[![version](https://img.shields.io/badge/node->=12-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![coverage](https://img.shields.io/codecov/c/github/linden-honey/linden-honey-bot-nodejs)](https://codecov.io/github/linden-honey/linden-honey-bot-nodejs)
[![tag](https://img.shields.io/github/tag/linden-honey/linden-honey-bot-nodejs.svg)](https://github.com/linden-honey/linden-honey-bot-nodejs/tags)

## Technologies

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Telegraf](http://telegraf.js.org/)

## Usage

### Local

The following environment variables should be exported before running:

- `APPLICATION_API_BASE_URL`
- `APPLICATION_TELEGRAM_BOT_TOKEN`
- `SERVER_LOAD_BALANCER_URL`

Run application:

```bash
npm run start
```

Run application in debug mode:

```bash
npm run debug
```

Run tests:

```bash
npm run test
```

### Docker

Bootstrap full project using docker-compose:

```bash
docker-compose up
```

Bootstrap project excluding some services using docker-compose:

```bash
docker-compose up --scale [SERVICE=0...]
```

Stop and remove containers, networks, images:

```bash
docker-compose down
```

## Telegram bot instance

[https://telegram.me/BolshevikBot](https://telegram.me/BolshevikBot)
