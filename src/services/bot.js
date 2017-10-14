const Telegraf = require('telegraf')

module.exports = class Bot {
    constructor({ token, webhookUrl, commands, dependencies: { api, templateEngine } }) {
        this.telegraf = new Telegraf(token)
        this.commands = commands
        this.api = api
        this.templateEngine = templateEngine
        this.init()
        this.webhook = webhookUrl
    }

    init() {
        this.telegraf.command('anthem', async ctx => {
            const song = await this.api.getRandomSong()
            const html = await this.templateEngine.render('song.html', song)
            ctx.reply(html, { parse_mode: 'HTML' })
        })

        this.telegraf.command('help', async ctx => {
            const help = {
                caption: this.commands.HELP.DESCRIPTION,
                commands: Object.keys(this.commands)
                    .sort((k1, k2) => k1.localeCompare(k2))
                    .map(key => ({
                        name: key.toLowerCase(),
                        description: this.commands[key].DESCRIPTION
                    }))
            }
            const html = await this.templateEngine.render('help.html', help)
            ctx.reply(html, { parse_mode: 'HTML' })
        })

        this.telegraf.command('lenin', async ctx => {
            const songs = await this.api.findSongsByTitle('Песня о Ленине')
            const quote = songs[0] && await this.api.getRandomQuoteFromSong(songs[0]._id)
            ctx.reply(quote.phrase)
        })

        this.telegraf.command('say', async ctx => {
            const quote = await this.api.getRandomQuote()
            ctx.reply(quote.phrase)
        })

        this.telegraf.command('start', async ctx => {
            ctx.replyWithSticker(this.commands.START.STICKER)
        })

        this.telegraf.command('stop', async ctx => {
            ctx.replyWithSticker(this.commands.STOP.STICKER)
        })

        this.telegraf.on('inline_query', async ctx => {
            const size = 20
            const page = Number.parseInt(ctx.inlineQuery.offset) || 0
            const previews = await this.api.findSongsByPhrase(ctx.inlineQuery.query, { page, size })
            const songs = await Promise.all(
                previews.map(async pv => await this.api.getSong(pv._id))
            )
            const results = await Promise.all(
                songs.map(async song => ({
                    id: song._id,
                    type: 'article',
                    title: song.title,
                    input_message_content: {
                        message_text: await this.templateEngine.render('song.html', song),
                        parse_mode: 'HTML'
                    }
                }))
            )
            ctx.answerInlineQuery(results, {
                next_offset: page + 1
            })
        })
    }

    set webhook(webhookUrl) {
        this.telegraf.telegram.setWebhook(webhookUrl)
    }

    handleUpdate(update, webhookResponse) {
        this.telegraf.handleUpdate(update, webhookResponse)
    }
}
