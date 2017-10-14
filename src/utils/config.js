const nconf = require('nconf')

nconf
    .argv()
    .env({
        separator: '_'
    })
    .file('file-config', {
        file: 'linden_honey.json',
        dir: 'config',
        search: true
    })
    .defaults({
        LH: {
            APP: {
                NAME: 'Linden Honey Bot',
                PORT: process.env.PORT || 8080
            },
            TELEGRAM: {
                BOT: {
                    COMMANDS: {}
                }
            }
        }
    })

nconf.required([
    'LH:APP:API:URL',
    'LH:APP:TELEGRAM:BOT:TOKEN',
    'LH:LB:URL'
])

module.exports = nconf
