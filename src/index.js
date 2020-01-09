const express = require('express')
require('express-async-errors')// patch to support promise rejection

const { config } = require('./utils/config')

const {
    Api,
    Bot,
    TemplateEngine,
} = require('./services')

const {
    TelegramController,
} = require('./controllers')

const app = express()

const { Router } = express

/**
 * Declare telegram routes
 */
const telegramSecretSeed = Date.now()
const telegramController = new TelegramController({
    bot: new Bot({
        token: config.application.telegram.bot.token,
        webhookUrl: `${config.server.loadBalancer.url}/api/telegram/updates${telegramSecretSeed}`,
        dependencies: {
            api: new Api({
                baseUrl: config.application.api.baseUrl,
            }),
            templateEngine: new TemplateEngine(),
        },
    }),
})
const telegramRouter = new Router()
    .post(`/updates/${telegramSecretSeed}`, telegramController.handleUpdate)

/**
 * Declare API routes
 */
const apiRouter = new Router()
    .use(express.json())
    .use('/telegram', telegramRouter)

/**
 * Apply routes
 */
app.use(config.application.rest.basePath, apiRouter)

app.listen(config.server.port, () => {
    console.log(`Application is started on ${config.server.port} port!`)
})
