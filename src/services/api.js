const axios = require('axios')

class Api {
    constructor({ baseUrl }) {
        this.client = axios.create({
            baseURL: baseUrl,
        })
    }

    findSongsByTitle = async (title, options = {}) => {
        const { data } = await this.client.get(
            '/songs/search/by-title',
            { params: { title, ...options } },
        )
        return data
    }

    findSongsByPhrase = async (phrase, options = {}) => {
        const { data } = await this.client.get(
            '/songs/search/by-phrase',
            { params: { phrase, ...options } },
        )
        return data
    }

    getRandomSong = async () => {
        const { data } = await this.client.get('/songs/search/random')
        return data
    }

    getSong = async (id) => {
        const { data } = await this.client.get(`/songs/${id}`)
        return data
    }

    getRandomQuote = async () => {
        const { data } = await this.client.get('/quotes/search/random')
        return data
    }

    getRandomQuoteFromSong = async (songId) => {
        const { data } = await this.client.get(`/songs/${songId}/quotes/search/random`)
        return data
    }
}

module.exports = Api
