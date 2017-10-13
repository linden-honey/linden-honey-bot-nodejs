const Telegraf = require('telegraf')


module.exports = class Bot {
    constructor({ token, webhookUrl, dependencies: { api, templateEngine } }) {
        this.telegraf = new Telegraf(token)
        this.api = api
        this.templateEngine = templateEngine
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

        this.telegraf.command('anthem', async ctx => {
            const song = await this.api.getRandomSong()
            const html = await this.templateEngine.render('song', song)
            ctx.reply(html, { parse_mode: 'HTML' })
        })

    }

    set webhook(webhookUrl) {
        this.telegraf.telegram.setWebhook(webhookUrl)
    }

    handleUpdate(update, webhookResponse) {
        this.telegraf.handleUpdate(update, webhookResponse)
    }
}
