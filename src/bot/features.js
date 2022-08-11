const {
    debounceMiddleware,
    replyWithRandomSongMiddleware,
    replyWithRandomQuoteAboutLeninMiddleware,
    replyWithRandomQuoteAboutDickMiddleware,
    replyWithRandomQuoteAboutPussyMiddleware,
    replyWithAllForPidorsMiddleware,
} = require('./middleware')

// commands

const anthemCommand = ({ api, templateEngine }) => (bot) => {
    bot.command('anthem', replyWithRandomSongMiddleware({ api, templateEngine }))
}

const helpCommand = ({ templateEngine }) => (bot) => {
    bot.command('help', async (ctx) => {
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
        const html = await templateEngine.render('help.html', data)
        ctx.reply(html, { parse_mode: 'HTML' })
    })
}
const leninCommand = ({ api }) => (bot) => {
    bot.command('lenin', replyWithRandomQuoteAboutLeninMiddleware({ api }))
}

const sayCommand = ({ api }) => (bot) => {
    bot.command('say', async (ctx) => {
        const quote = await api.getRandomQuote()
        ctx.reply(quote.phrase)
    })
}

const startCommand = () => (bot) => {
    bot.command('start', (ctx) => {
        ctx.replyWithSticker('CAADAgAD0wQAAu75nwV1MhAIlGmvlwI')
    })
}

const stopCommand = () => (bot) => {
    bot.command('stop', (ctx) => {
        ctx.replyWithSticker('CAADAgADrwQAAu75nwWJzfxZULhKCQI')
    })
}

// inline query

const inlineQueryByPhrase = ({ api, templateEngine }) => (bot) => {
    bot.on('inline_query', async (ctx) => {
        const limit = 20
        const offset = Number.parseInt(ctx.inlineQuery.offset, 10) || 0
        const { data } = await api.findSongsByPhrase(
            ctx.inlineQuery.query,
            { offset, limit },
        )
        const songs = await Promise.all(data.map(({ id }) => api.getSong(id)))
        const results = await Promise.all(
            songs.map(async (song) => ({
                id: song.id,
                type: 'article',
                title: song.title,
                input_message_content: {
                    message_text: await templateEngine.render('song.html', song),
                    parse_mode: 'HTML',
                },
            })),
        )
        ctx.answerInlineQuery(results, {
            next_offset: offset + limit,
        })
    })
}

// messages

const hearsLenin = ({ api }) => (bot) => {
    bot.hears(/ленин/ui, replyWithRandomQuoteAboutLeninMiddleware({ api }))
}

const hearsDick = ({ api }) => (bot) => {
    bot.hears(/ху[йияё]/ui, debounceMiddleware(
        60 * 5, // 5 minutes
        replyWithRandomQuoteAboutDickMiddleware({ api, replyToMessage: true }),
    ))
}
const hearsPussy = ({ api }) => (bot) => {
    bot.hears(/пизд[ауые]/ui, debounceMiddleware(
        60 * 5, // 5 minutes
        replyWithRandomQuoteAboutPussyMiddleware({ api, replyToMessage: true }),
    ))
}

const ALL_FOR_PIDORS_PATTERN = /крипт\p{sc=Cyrillic}*|\w*\.*js|фронт|галер\p{sc=Cyrillic}*|стартап|с*пасиб[оа]*|получается|apple|дайсон|гамарджоба|побед\p{sc=Cyrillic}*/ui
const hearsAllForPidors = () => (bot) => {
    bot.hears(ALL_FOR_PIDORS_PATTERN, debounceMiddleware(
        60 * 5, // 5 minutes
        replyWithAllForPidorsMiddleware(),
    ))
}

module.exports = {
    anthemCommand,
    helpCommand,
    leninCommand,
    sayCommand,
    startCommand,
    stopCommand,
    inlineQueryByPhrase,
    hearsLenin,
    hearsDick,
    hearsPussy,
    hearsAllForPidors,
}
