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
        APP: {
            NAME: 'Linden Honey Bot',
            PORT: 8080
        }
    })

nconf.required([
    'APP:NAME',
    'APP:PORT',
    'APP:LB:BASE_URL',
    'APP:TELEGRAM:BOT:TOKEN'
])

module.exports = nconf
