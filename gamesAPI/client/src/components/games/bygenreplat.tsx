import { gql, useLazyQuery } from "@apollo/client";
import { useRef, useState } from "react";

import "../../styles/allgames.css"

const QUERY_GAMES = gql`
    query getGamesByPlatformGenre($platform: String!,$genre: String!) {

        gamesByPlatformGenre(platform: $platform, genre: $genre) {

            ...on GameSuc {
                games {
                    id
                    title
                    genre
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
    platform: string
    //publisher: String,
    //platform: String,
    //release_date: String

}

export default function ByGenrePlatform() {

    const [fetch, {data, loading, error}] = useLazyQuery(QUERY_GAMES)

    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const holder = useRef<any>()

    if(data) {

        console.log(data)

    }

    return (

        <div>

            <div className="info">

                <h2>Jogo por Gênero e Plataforma</h2>
                <p>Retorna um jogo baseado no gênero e plataforma especificados.</p>

                <input type="text" name="genre" id="genre" placeholder="Gênero do jogo" onChange={(e) => setGenre(e.target.value)} />
                <input type="text" name="platform" id="platform" placeholder="Plataforma do jogo(pc ou browser) do jogo" onChange={(e) => setPlatform(e.target.value)} />

                <button onClick={() => fetch({variables: {platform, genre}})}>Gerar</button>

            </div>

            <section className="holdSect">

                <div ref={holder} className="holder">

                    {data && 
                        data.gamesByPlatformGenre.games.map((game: Game, key: number) => {

                            return <div className="game" key={key}>
                                <p>Title: {game.title}</p>
                                <p>Description: {game.short_description}</p>
                                <p>Genre: {game.genre}</p>
                            </div>

                        })
                    }

                </div>

            </section>

        </div>

    )

}