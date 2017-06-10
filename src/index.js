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

server.name = config.get('APP:PORT')
server.use(logger())
server.use(bodyParser())
server.use(telegramRouter.middleware())

server.listen(process.env.PORT || config.get('APP:PORT') || 8080, () => {
    console.log(`${server.name} application started!`)
})
