const axios = require('axios')

module.exports = class Api {
    constructor({ baseUrl }) {
        this.axios = axios.create({
            baseURL: baseUrl
        })
    }

    findSongs(title) {
        return this.axios.get('/songs', {
            params: {
                search: title
            }
        })
            .then(res => res.data)
    }

    getSong(id) {
        return this.axios.get(`/songs/${id}`)
            .then(res => res.data)
    }

    getRandomQuote() {
        return this.axios.get('/quotes/random')
            .then(res => res.data)
    }

    getRandomQuoteFromVerse(verseId) {
        return this.axios.get(`/verses/${verseId}/quotes/random`)
            .then(res => res.data)
    }

    getRandomQuoteFromSong(songId) {
        return this.axios.get(`/songs/${songId}/quotes/random`)
            .then(res => res.data)
    }
}
