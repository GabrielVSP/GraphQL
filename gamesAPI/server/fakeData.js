const fetch = require("node-fetch");
globalThis.fetch = fetch
let data = [{'id': 'vintedois'}]

let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
   }

async function getGames() {

    let response = await fetch("https://www.freetogame.com/api/games", { 
        method: "GET",
        headers: headersList
    });

    let data = res

   

}

module.exports = {data}
