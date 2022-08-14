const { Telegraf } = require('telegraf')
const express = require('express')
require('express-async-errors')// patch to support promise rejection

const config = require('./utils/config')

const {
    Api,
    TemplateEngine,
} = require('./services')

const { features } = require('./bot')

const {
    TelegramController,
} = require('./controllers')

console.log('initializing services')

const api = new Api({
    baseUrl: config.application.api.baseUrl,
})
const templateEngine = new TemplateEngine()

console.log('initializing telegram bot')

const telegramBot = new Telegraf(config.application.telegram.bot.token)

Object
    .values(features)
    .map((feature) => feature({ api, templateEngine }))
    .forEach((feature) => feature(telegramBot))

const telegramBotWebhookSecret = config.application.telegram.bot.webhookSecret
telegramBot.telegram.setWebhook(`${config.server.loadBalancer.url}/api/telegram/updates/${telegramBotWebhookSecret}`)

console.log('initializing http server')

const app = express()
const { Router } = express

const telegramController = new TelegramController({ bot: telegramBot })
const telegramRouter = new Router()
    .post(`/updates/${telegramBotWebhookSecret}`, telegramController.handleUpdate)

const apiRouter = new Router()
    .use(express.json())
    .use('/telegram', telegramRouter)

app.use(config.application.rest.basePath, apiRouter)

app.listen(config.server.port, () => {
    console.log(`application started on ${config.server.port} port`)
})
