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

           // console.log(await response.json())
            return await response.json()

        }
       
    }

}

module.exports = {resolvers}