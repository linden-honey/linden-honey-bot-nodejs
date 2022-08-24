const debounceMiddleware = (seconds, middleware, fallbackMiddleware) => {
    // userID => lastNotifiedAt
    const cache = new Map()

    return (ctx, next) => {
        const userId = ctx?.from?.id
        const currentTime = new Date().getTime()
        const lastNotifiedAt = cache.get(userId) ?? currentTime
        const secondsDelta = Math.round(Math.abs(currentTime - lastNotifiedAt) / 1000)
        if (secondsDelta === 0 || secondsDelta >= seconds) {
            cache.set(userId, currentTime)
            middleware(ctx, next)
        } else if (fallbackMiddleware) {
            fallbackMiddleware(ctx, next)
        }
    }
}

const replyWithRandomPhraseMiddleware = (phrases = []) => (ctx) => {
    const randomPhrase = phrases[Math.floor((Math.random() * phrases.length))]
    ctx.reply(randomPhrase, {
        reply_to_message_id: ctx?.message?.message_id,
    })
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
const replyWithRandomQuoteAboutPussyMiddleware = ({ api, replyToMessage }) => replyWithRandomQuoteFromSongMiddleware({ title: 'Всё летит в пизду', replyToMessage, api })

const replyWithAllForPidorsMiddleware = () => (ctx) => {
    const matchedWord = ctx?.match.at(0)
    const phrase = `${matchedWord} для пидоров`
    ctx.reply(phrase, {
        reply_to_message_id: ctx?.message?.message_id,
    })
}

const replyWithApprovalMiddleware = () => (ctx) => {
    ctx.reply('Получается что так', {
        reply_to_message_id: ctx?.message?.message_id,
    })
}

const replyWithDesiredStreetMiddleware = () => (ctx) => {
    const streets = [
        'на Щорса',
        'на Сабуртало',
        'на Шмидта',
        'на Блюхера',
        'на Белых Росах',
        'в Вертилишках',
        'в Путришках',
    ]
    const username = `@${ctx?.from?.username}`
    const randomStreet = streets[Math.floor((Math.random() * streets.length))]
    const phrase = `Вот было бы словно, если бы ${username} ${randomStreet} жил`
    ctx.reply(phrase, {
        reply_to_message_id: ctx?.message?.message_id,
    })
}

const replyWithRefuseMiddleware = () => replyWithRandomPhraseMiddleware([
    'Отставить!',
    'Не положено!',
    'Ожидайте!',
    'Я за ним занимал!',
    'Потише!',
    'Э!',
])

module.exports = {
    debounceMiddleware,
    replyWithRandomSongMiddleware,
    replyWithRandomQuoteMiddleware,
    replyWithRandomQuoteFromSongMiddleware,
    replyWithRandomQuoteAboutLeninMiddleware,
    replyWithRandomQuoteAboutDickMiddleware,
    replyWithRandomQuoteAboutPussyMiddleware,
    replyWithAllForPidorsMiddleware,
    replyWithApprovalMiddleware,
    replyWithDesiredStreetMiddleware,
    replyWithRandomPhraseMiddleware,
    replyWithRefuseMiddleware,
}
