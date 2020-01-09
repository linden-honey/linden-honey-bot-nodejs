const getEnv = (key, defaultValue) => {
    if (key === undefined) {
        throw new Error("Missing 'key' argument!")
    }
    const hasValue = process.env[key] !== undefined
    if (!hasValue && defaultValue === undefined) {
        throw new Error(`"${key}" is required!`)
    }
    return hasValue ? process.env[key] : defaultValue
}

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

module.exports = {
    getEnv,
    config: Object.freeze(config),
}
