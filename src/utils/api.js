const axios = require('axios')

module.exports = class Api {
    constructor({ baseUrl }) {
        this.axios = axios.create({
            baseURL: baseUrl
        })
    }

    findSongsByTitle(title) {
        return this.axios
            .get('/songs/search/by-title', { params: { title } })
            .then(res => res.data)
    }

    findSongsByPhrase(phrase) {
        return this.axios
            .get('/songs/search/by-phrase', { params: { phrase } })
            .then(res => res.data)
    }

    getRandomSong() {
        return this.axios.get('/songs/search/random')
            .then(res => res.data)
    }

    getSong(id) {
        return this.axios.get(`/songs/${id}`)
            .then(res => res.data)
    }

    getRandomQuote() {
        return this.axios.get('/quotes/search/random')
            .then(res => res.data)
    }
}
