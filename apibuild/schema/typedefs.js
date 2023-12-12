const { gql } = require("apollo-server")

//Import graphql from apollo

//Basically graphQL code
const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
    }

    type Query {
        users: [User!]!
    }
`

//Exports the types
module.exports = {typeDefs}
