import { useQuery, gql } from "@apollo/client"

const QUERY_ALL_USERS = gql`
    query getusers {
    users {
        name
        username
        id
    }
}
`

export default function DisplayData() {

    const {data} = useQuery(QUERY_ALL_USERS)

    if (data) {
        console.log(data)
    }

    return (

        <div>

        </div>

    )

}