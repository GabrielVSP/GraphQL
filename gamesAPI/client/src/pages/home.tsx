import Footer from "../components/footer";
import AllGames from "../components/games/allGames";
import ByGenrePlatform from "../components/games/bygenreplat";
import Game from "../components/games/game";
import Header from "../components/header";
import "../styles/home.css";

export default function Home() {

    return (

        <>

            <Header />

            <main>

                <section className="apiinfo">
                    <h2> - Uma <strong>API</strong> que mostra dados de jogos <strong>gratuitos</strong>.</h2>
                </section>

                <AllGames />
                <Game />
                <ByGenrePlatform />

            </main>

            <Footer />

        </>

    )

}