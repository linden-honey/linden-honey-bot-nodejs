const axios = require('axios')

module.exports = class Api {
    constructor({baseUrl}) {
        this.api = axios.create({
            baseURL: baseUrl
        })
    }

    getRandomQuote() {
        return this.api.get('/quotes/random')
    }
}
