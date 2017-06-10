const Telegraf = require('telegraf')
const config = require('./config')
const { PATH } = require('./constants')

const bot = module.exports = new Telegraf(config.get('LINDEN_HONEY:APP:TELEGRAM:BOT:TOKEN'))
const webhookUrl = `${config.get('LINDEN_HONEY:LB:BASE_URL')}${PATH.API_TELEGRAM}/updates`

bot.telegram.setWebhook(webhookUrl)

bot.hears([/ключ/i, /границ/i, /пополам/i, /всё/i, /план/i, /идёт/i], ctx => {
    ctx.replyWithSticker('CAADAgAD0wQAAu75nwV1MhAIlGmvlwI')
})
