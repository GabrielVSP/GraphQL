const { gql } = require("apollo-server")

const typeDefs = gql`

    type Game {
        id: ID!
        title: String!
        short_description: String!
        genre: String!
        publisher: String!
        platform: String!
        release_date: String!
    }

    type Query {
        games: GamesResult!
        game(id: ID!): GamesResult!
        gamesByPlatform(platform: String!): GamesResult!
        gamesByGenre(genre: String!): GamesResult!
        gamesByPlatformGenre(platform: String!, genre: String!): GamesResult!
    }

    type GameSuc {
        games: [Game!]
    }

    type GameError {
        message: String!
    }

    union GamesResult = GameSuc | GameError


`

module.exports = {typeDefs}