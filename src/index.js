const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router')

const { bot, config }  = require('./utils')
const { PATH } = require('./utils/constants')
const { telegramController } = require('./controllers')

const server = module.exports = new Koa()

server.context.bot = bot
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
