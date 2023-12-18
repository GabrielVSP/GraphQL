import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client"
import { useState } from "react"

const QUERY_ALL_USERS = gql`
    query getusers {
    users {
        name
        username
        id
        age
        nationality
    }
}
`
const QUERY_ALL_MOVIES = gql`
    query getmovies {
    movies {
        id
        name
        year
        isInTheaters
    }
}
`

const QUERY_MOVIE= gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
            year
            id
        }
}
`
const MUTATION_CREATE_USER = gql`
    mutation CreateUser($input: CreateUser!) {
        createUser(input: $input) {
            name
            id
        }
    }
`
interface User {
    id: number | string,
    name: string,
    username: string,
    age: number,
    nationality: string
}

interface Movie {
    id: number | string,
    name: string,
    year: number,
    isInTheaters: boolean
}

export default function DisplayData() {

    const [movieSearch, setMovieSearch] = useState("")

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [nationality, setNationality] = useState("")
    const [age, setAge] = useState(18)

    const {data, loading, error, refetch} = useQuery(QUERY_ALL_USERS)
    const {data: movieData, loading: movieLoad, error: movieError} = useQuery(QUERY_ALL_MOVIES)
    const [fetchMovie, {data: MVSData, error: MVSError}] = useLazyQuery(QUERY_MOVIE)

    const [createUser] = useMutation(MUTATION_CREATE_USER)

    if (loading || movieLoad) {
        return <h1>Data loading</h1>
    }else if (error || movieError) {
        console.log(error)
    }

    if (MVSError) {
        console.log(MVSError)
    }

    return (
    
        <section>

            <div>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" placeholder="Nationality" onChange={(e) => setNationality(e.target.value.toUpperCase())} />
                <input type="number" placeholder="Age" onChange={(e) => setAge(Number(e.target.value))}/>

                <input type="submit" value="Create" onClick={() => {createUser({
                    variables: {input: {name, username, age, nationality}}
                    })
                    refetch()

                }
                } />
            </div>

            <h2>All users</h2>

            <div>
                {data && data.users.map((user: User, key: number) => {
                    return (
                        <div key={key}>
                            <p>Name: {user.name}</p>
                            <p>Username: {user.username}</p>
                            <p>Nationality: {user.nationality}</p>
                            <p>Age: {user.age}</p>
                            <p>Id: {user.id}</p>
                            <hr></hr>
                        </div>
                    )
                })}
            </div>

            <h2>Movies</h2>

            <div>
                {movieData && movieData.movies.map((movie: Movie, key: number) => {
                    return (
                        <div key={key}>
                            <p>Name: {movie.name}</p>
                            <p>Year of publication: {movie.year}</p>
                            <p>Is in theaters: {movie.isInTheaters}</p>
                            <hr />
                        </div>                       
                    )
                })}
            </div>

            <h2>Select a Movie</h2>

            <div>
                <input type="text" name="movie" id="movie" onChange={(e) => setMovieSearch(e.target.value)} />
                <button onClick={() => fetchMovie({variables:{
                    name: movieSearch
                }})} > Search for movie </button>
                <div>
                    {MVSData && 
                        <div>
                            <p>Name: {MVSData.movie.name}</p>
                            <p>Year: {MVSData.movie.year}</p>
                        </div>
                    }
                    {MVSError &&
                        <p>Error: Cannot get information about that movie</p>
                    }
                </div>
            </div>

        </section>
    )

}