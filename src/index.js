const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

const { Api, Bot, config }  = require('./utils')
const { PATH } = require('./utils/constants')
const { telegramController } = require('./controllers')

const server = module.exports = new Koa()

server.context.bot = new Bot({
    token: config.get('LH:APP:TELEGRAM:BOT:TOKEN'),
    webhookUrl: `${config.get('LH:LB:URL')}${PATH.API_TELEGRAM}/updates`,
    dependencies: {
        api: new Api({ baseUrl: config.get('LH:APP:API:URL')})
    }
})
server.context.config = config

const telegramRouter = Router({ prefix: PATH.API_TELEGRAM })

telegramRouter
    .post('/updates', telegramController.handleUpdate)

server.use(logger())
server.use(bodyParser())
server.use(telegramRouter.middleware())

server.listen(config.get('LH:APP:PORT'), () => {
    console.log(`${config.get('LH:APP:NAME')} application started!`)
})
