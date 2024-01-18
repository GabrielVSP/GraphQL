import AllGames from "../components/allGames";
import Game from "../components/game";
import "../styles/home.css";

export default function Home() {

    return (

        <>

            <header>
                <h1><strong>Omega</strong> Industries - Games API</h1>
            </header>

            <main>

                <section className="apiinfo">
                    <h2> - Uma <strong>API</strong> que mostra dados de jogos <strong>gratuitos</strong>.</h2>
                </section>

                <AllGames />
                <Game />

            </main>

        </>

    )

}