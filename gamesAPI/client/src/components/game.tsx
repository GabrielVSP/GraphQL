import { gql, useLazyQuery } from "@apollo/client";
import { useRef, useState } from "react";

import "../styles/allgames.css"

const QUERY_GAMES = gql`
    query getGame($id: ID!) {

        game(id: $id) {

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

export default function Game() {

    const [fetch, {data, loading, error}] = useLazyQuery(QUERY_GAMES)

    const [gid, setGId] = useState(1);
    const holder = useRef<any>()

    if(data) {

        console.log(data)

    }

    return (

        <div>

            <div className="info">

                <h2>Jogo por ID</h2>
                <p>Retorna um jogo baseado no seu ID.</p>

                <input type="number" name="gid" id="gid" placeholder="ID do jogo" min="1" onChange={(e) => setGId(Number(e.target.value))} />
                <button onClick={() => fetch({variables: {id: gid}})}>Gerar</button>

            </div>

            <section className="holdSect">

                <div ref={holder} className="holder">

                    {data && 
                        <div className="game">
                            <p>Title: {data.game.games[0].title}</p>
                            <p>Description: {data.game.games[0].short_description}</p>
                            <p>Genre: {data.game.games[0].genre}</p>
                        </div>
                    }

                </div>

            </section>

        </div>

    )

}