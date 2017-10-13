const Telegraf = require('telegraf')


module.exports = class Bot {
    constructor({ token, webhookUrl, dependencies: { api } }) {
        this.telegraf = new Telegraf(token)
        this.api = api
        this.init()
        this.webhook = webhookUrl
    }

    init() {
        this.telegraf.command('lenin', async ctx => {
            const songs = await this.api.findSongsByTitle('Песня о Ленине')
            const quote = songs[0] && await this.api.getRandomQuoteFromSong(songs[0]._id)
            ctx.reply(quote.phrase)
        })

        this.telegraf.command('say', async ctx => {
            const quote = await this.api.getRandomQuote()
            ctx.reply(quote.phrase)
        })

    }

    set webhook(webhookUrl) {
        this.telegraf.telegram.setWebhook(webhookUrl)
    }

    handleUpdate(update, webhookResponse) {
        this.telegraf.handleUpdate(update, webhookResponse)
    }
}
