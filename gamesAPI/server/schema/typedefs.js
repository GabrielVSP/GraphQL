const { gql } = require("apollo-server")

const typeDefs = gql`

    type Game {
        id: ID!
        title: String!
        short_description: String!
        genre: String!
        publisher: String!
        release_date: String!
    }

    type Query {
        games: [Game!]!
    }

`

module.exports = {typeDefs}