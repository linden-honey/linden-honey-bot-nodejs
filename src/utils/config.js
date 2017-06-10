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
        LH: {
            APP: {
                NAME: 'Linden Honey Bot',
                PORT: process.env.PORT || 8080
            }
        }
    })

nconf.required([
    'LH:APP:TELEGRAM:BOT:TOKEN',
    'LH:LB:URL'
])

module.exports = nconf
