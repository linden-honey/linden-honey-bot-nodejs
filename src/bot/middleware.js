const debounceMiddleware = (seconds, middleware) => {
    // userID => lastNotifiedAt
    const cache = new Map()

    return async (ctx, next) => {
        const userId = ctx?.from?.id
        const currentTime = new Date().getTime()
        const lastNotifiedAt = cache.get(userId) ?? currentTime
        const secondsDelta = Math.round(Math.abs(currentTime - lastNotifiedAt) / 1000)
        if (secondsDelta >= seconds) {
            cache.set(userId, currentTime)
            await middleware(ctx, next)
        }
    }
}

const replyMiddleware = (action, extra = {}) => async (ctx) => {
    const res = await action(ctx)
    if (res) {
        const { replyToMessage, ...filteredExtra } = extra
        ctx.reply(res, {
            ...(replyToMessage && { reply_to_message_id: ctx?.message?.message_id }),
            ...filteredExtra,
        })
    }
}

const replyWithRandomSongMiddleware = ({ api, templateEngine }) => async (ctx) => {
    const song = await api.getRandomSong()
    const html = await templateEngine.render('song.html', song)
    ctx.reply(html, { parse_mode: 'HTML' })
}

const replyWithRandomQuoteMiddleware = ({ api }) => async (ctx) => {
    const quote = await api.getRandomQuote()
    ctx.reply(quote.phrase)
}

const replyWithRandomQuoteFromSongMiddleware = ({ title, replyToMessage, api }) => async (ctx) => {
    const { data } = await api.findSongsByTitle(title)
    const song = data && data.at(-1)
    if (song) {
        const { phrase } = await api.getRandomQuoteFromSong(song.id)
        ctx.reply(phrase, {
            ...(replyToMessage && { reply_to_message_id: ctx?.message?.message_id }),
        })
    }
}

const replyWithRandomQuoteAboutLeninMiddleware = ({ api, replyToMessage }) => replyWithRandomQuoteFromSongMiddleware({ title: 'Песня о Ленине', replyToMessage, api })
const replyWithRandomQuoteAboutDickMiddleware = ({ api, replyToMessage }) => replyWithRandomQuoteFromSongMiddleware({ title: 'Хуй', replyToMessage, api })
const replyWithRandomQuoteAboutPussyMiddleware = ({ api, replyToMessage }) => replyWithRandomQuoteFromSongMiddleware({ title: 'Винтовка', replyToMessage, api })

const replyWithAllForPidorsMiddleware = () => async (ctx) => {
    const matchedWord = ctx?.match[0]
    const phrase = `${matchedWord} для пидоров.`
    ctx.reply(phrase, {
        reply_to_message_id: ctx?.message?.message_id,
    })
}

module.exports = {
    debounceMiddleware,
    replyMiddleware,
    replyWithRandomSongMiddleware,
    replyWithRandomQuoteMiddleware,
    replyWithRandomQuoteFromSongMiddleware,
    replyWithRandomQuoteAboutLeninMiddleware,
    replyWithRandomQuoteAboutDickMiddleware,
    replyWithRandomQuoteAboutPussyMiddleware,
    replyWithAllForPidorsMiddleware,
}
