const Telegraf = require('telegraf')
const Api = require('./api')

module.exports = class Bot {
    constructor({ dataUrl, token, webhookUrl }) {
        this.telegraf = new Telegraf(token)
        this.api = new Api({
            baseUrl: dataUrl
        })
        this.init()
        this.webhook = webhookUrl
    }

    init() {
        this.telegraf.command('say', ctx => {
            this.api.getRandomQuote()
                .then(res => res.data)
                .then(quote => ctx.reply(quote.phrase))
        })
    }

    set webhook(webhookUrl) {
        this.telegraf.telegram.setWebhook(webhookUrl)
    }

    handleUpdate(update, webhookResponse) {
        this.telegraf.handleUpdate(update, webhookResponse)
    }
}
