import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";

import "../styles/allgames.css"

const QUERY_ALL_GAMES = gql`
    query getGames {

        games {

        ...on GameSuc{
            games {
                id
                title
                genre
                short_description
            }
        }

        ...on GameError {
            message
        }

        }

}
`

interface Game {

    id: string,
    title: string,
    short_description: string,
    genre: string,
    //publisher: String,
    //platform: String,
    //release_date: String

}

export default function AllGames() {

    const {data, loading, error} = useQuery(QUERY_ALL_GAMES)
    const holder = useRef<any>()

    function placeData() {

        if(data) {

            data.games.games.map((game: Game, key: number) => {

                let div = document.createElement("div")
                div.className = "game"

                let title = document.createElement("p")
                let shortDesc = document.createElement("p")
                let genre = document.createElement("p")

                title.innerText = "Title: "+game.title
                shortDesc.innerText = "Description: "+game.short_description
                genre.innerText = "Genre: "+game.genre

                div.appendChild(title)
                div.appendChild(shortDesc)
                div.appendChild(genre)

                holder.current.appendChild(div)
            })

        }


    }

    return (

        <div>

            <div className="info">

                <h2>Lista de jogos</h2>
                <p>Gera uma lista de jogos contendo: título, gênero e descrição.</p>

                <button onClick={placeData}>Gerar lista</button>

            </div>

            <section className="holdSect">

                <div ref={holder} className="holder">


                </div>

            </section>

        </div>

    )

}