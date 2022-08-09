const { Telegraf } = require('telegraf')

class Bot {
    constructor({
        token,
        webhookUrl,
        dependencies: {
            api,
            templateEngine,
        },
    }) {
        this.telegraf = new Telegraf(token)
        this.api = api
        this.templateEngine = templateEngine
        this.init()
        this.webhook = webhookUrl
    }

    init = () => {
        this.telegraf.command('anthem', async (ctx) => {
            const song = await this.api.getRandomSong()
            const html = await this.templateEngine.render('song.html', song)
            ctx.reply(html, { parse_mode: 'HTML' })
        })

        this.telegraf.command('help', async (ctx) => {
            const data = {
                caption: 'Методичка',
                commands: [
                    {
                        name: 'anthem',
                        description: 'Гимн',
                    },
                    {
                        name: 'help',
                        description: 'Методичка',
                    },
                    {
                        name: 'lenin',
                        description: 'Ленин - это ...',
                    },
                    {
                        name: 'say',
                        description: 'Право говорить',
                    },
                    {
                        name: 'start',
                        description: 'Начать строить коммунизм',
                    },
                    {
                        name: 'stop',
                        description: 'Цикл закончен - пора по местам',
                    },
                ],
            }
            const html = await this.templateEngine.render('help.html', data)
            ctx.reply(html, { parse_mode: 'HTML' })
        })

        const leninMiddleware = async (ctx) => {
            const { data } = await this.api.findSongsByTitle('Песня о Ленине')
            const song = data && data[0]
            if (song) {
                const { phrase } = await this.api.getRandomQuoteFromSong(song.id)
                ctx.reply(phrase)
            }
        }
        this.telegraf.command('lenin', leninMiddleware)
        this.telegraf.hears(/.*ленин.*/i, leninMiddleware)

        this.telegraf.hears(/.*хуй.*/i, async (ctx) => {
            const { data } = await this.api.findSongsByTitle('Хуй')
            const song = data && data.at(-1)
            if (song) {
                const { phrase } = await this.api.getRandomQuoteFromSong(song.id)
                ctx.reply(phrase, {
                    reply_to_message_id: ctx.message.message_id,
                })
            }
        })

        this.telegraf.hears([/.*крипт.*/i, /.*node.*/i, /.*js.*/i, /.*галера.*/i], async (ctx) => ctx.reply(
            'для пидоров',
            {
                reply_to_message_id: ctx.message.message_id,
            },
        ))

        this.telegraf.command('say', async (ctx) => {
            const quote = await this.api.getRandomQuote()
            ctx.reply(quote.phrase)
        })

        this.telegraf.command('start', async (ctx) => {
            ctx.replyWithSticker('CAADAgAD0wQAAu75nwV1MhAIlGmvlwI')
        })

        this.telegraf.command('stop', async (ctx) => {
            ctx.replyWithSticker('CAADAgADrwQAAu75nwWJzfxZULhKCQI')
        })

        this.telegraf.on('inline_query', async (ctx) => {
            const limit = 20
            const offset = Number.parseInt(ctx.inlineQuery.offset, 10) || 0
            const { data } = await this.api.findSongsByPhrase(
                ctx.inlineQuery.query,
                { offset, limit },
            )
            const songs = await Promise.all(data.map(({ id }) => this.api.getSong(id)))
            const results = await Promise.all(
                songs.map(async (song) => ({
                    id: song.id,
                    type: 'article',
                    title: song.title,
                    input_message_content: {
                        message_text: await this.templateEngine.render('song.html', song),
                        parse_mode: 'HTML',
                    },
                })),
            )
            ctx.answerInlineQuery(results, {
                next_offset: offset + limit,
            })
        })
    }

    set webhook(webhookUrl) {
        this.telegraf.telegram.setWebhook(webhookUrl)
    }

    handleUpdate = (update, webhookResponse) => this.telegraf.handleUpdate(update, webhookResponse)
}

module.exports = Bot
