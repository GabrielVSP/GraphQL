//npm init
//npm install apollo-server graphql nodemon

const {ApolloServer} = require("apollo-server")

//typeDefs are used to stablish the types of the API

const {typeDefs} = require("./schema/typedefs")

//resolvers are functions that make the queries work

const {resolvers} = require("./schema/resolvers")

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
    //After the server has been loaded
    console.log('Your API is running: ' + url)
})
