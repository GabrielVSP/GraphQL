const {data} = require("../fakeData")
const fetch = require("node-fetch");
const _ = require("lodash")

globalThis.fetch = fetch

const resolvers = {

    Query: {

        async games() {

            let response = await fetch("https://www.freetogame.com/api/games", { 
                method: "GET",
            })

            const data = await response.json()

            return data ? {games: data} : {message: "Error when fetching data"}

        },

        async game(parent, args) {

            let response = await fetch("https://www.freetogame.com/api/game?id="+args.id, { 
                method: "GET",
            })

            const data = await response.json()

            return data ? {games: [data]} : {message: "Error when fetching data"}

        },

        async gamesByPlatform(parent, args) {

            let response = await fetch("https://www.freetogame.com/api/games?platform="+args.platform, { 
                method: "GET",
            })

            const data = await response.json()

            return data ? {games: data} : {message: "Error when fetching data"}

        },

        async gamesByGenre(parent, args) {

            let response = await fetch("https://www.freetogame.com/api/games?category="+args.genre, { 
                method: "GET",
            })

            const data = await response.json()

            return data ? {games: data} : {message: "Error when fetching data"}

        },

        async gamesByPlatformGenre(parent, args) {

            let response = await fetch(`https://www.freetogame.com/api/games?platform=${args.platform}&category=${args.genre}&sort-by=release-date`, { 
                method: "GET",
            })

            const data = await response.json()

            return data ? {games: data} : {message: "Error when fetching data"}

        }
       
    },

    GamesResult: {

        __resolveType(obj) {


            if (obj.games) {
                
                return "GameSuc"
            } 
            
            if (obj.message) {
                
                return "GameError"
            }

            return null

        }

    }

}

module.exports = {resolvers}