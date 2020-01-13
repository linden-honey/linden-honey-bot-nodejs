const { getEnv } = require('./env')

const config = {
    application: {
        rest: {
            basePath: getEnv('APPLICATION_REST_BASE_PATH', '/api'),
        },
        api: {
            baseUrl: getEnv('APPLICATION_API_BASE_URL'),
        },
        telegram: {
            bot: {
                webhookSecret: getEnv('APPLICATION_TELEGRAM_BOT_WEBHOOK_SECRET', Date.now()),
                token: getEnv('APPLICATION_TELEGRAM_BOT_TOKEN'),
            },
        },
    },
    server: {
        port: getEnv('SERVER_PORT', 8080),
        loadBalancer: {
            url: getEnv('SERVER_LOAD_BALANCER_URL'),
        },
    },
}

module.exports = Object.freeze(config)
