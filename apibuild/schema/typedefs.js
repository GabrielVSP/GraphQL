const { gql } = require("apollo-server")

//Import graphql from apollo

//Basically graphQL code
const typeDefs = gql`

    enum Nationality {
        ALBANIA
        BRAZIL
        CANADA
        DENMARK
        ECUADOR
        FRANCE
        GERMANY
        HUNGARY
    }

    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
        favoriteMovies: [Movie!]
    }

    type Movie {
        id: ID!
        name: String!
        year: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String): Movie! 
    }
`

//Exports the types
module.exports = {typeDefs}
