const nconf = require('nconf')

nconf
    .argv()
    .env({
        separator: '_'
    })
    .file('local', {
        file: 'linden_honey_config.json',
        dir: 'config',
        search: true
    })
    .defaults({
        LINDEN_HONEY: {
            APP: {
                NAME: 'Linden Honey Bot',
                PORT: process.env.PORT || 8080
            }
        }
    })

nconf.required([
    'LINDEN_HONEY:APP:TELEGRAM:BOT:TOKEN',
    'LINDEN_HONEY:LB:BASE_URL'
])

module.exports = nconf
