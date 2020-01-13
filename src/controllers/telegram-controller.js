class TelegramController {
    constructor({ bot }) {
        this.bot = bot
    }

    handleUpdate = async (req, res) => {
        if (req.is('json')) {
            const { body } = req
            try {
                await this.bot.handleUpdate(body, res)
            } catch (e) {
                const message = 'Error during update handling'
                console.error(message, e)
                res.status(500).send(message)
            }
        } else {
            res.status(415).send('Incorrect update format')
        }
    }
}

module.exports = TelegramController
