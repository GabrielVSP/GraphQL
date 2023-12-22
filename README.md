<h1>Building a GraphQL API</h1>

<h2> 1 - First we need to create the server folder</h2>
<p>We create the index.js file inside server, and run the following commands:</p>
<ol>
  <li>npm init</li>
  <li>npm install apollo-server graphql nodemon</li>
</ol>

<p>Apollo Server is a open-source GraphQL server that can be used with NodeJS</p>

<h2> 2 - Importing and setuping server</h2>

```
const {ApolloServer} = require("apollo-server")
const {typeDefs} = require("./schema/typedefs")
const {resolvers} = require("./schema/resolvers")
```

<p>
  Type defs are used to stablish types, queries, mutations... of the API, basically GraphQl code
</p>
<p>
  Resolvers are functions related to typedefs, these functions will make all the operations, such as queries and union types.
</p>

```
const server = new ApolloServer({ typeDefs, resolvers, context: ({req}) => { //req returns data about the request
    return {req}
} })

server.listen().then(({url}) => {
    console.log('Your API is running: ' + url)
})
```
<p>Next we stablish connection with the Apollo Server, passing the proper data, and the server has been loaded, we print the result in terminal</p>

<h2> 3 - Creating GraphQL code(Type defs)</h2>

```
const { gql } = require("apollo-server")

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
    }

`

module.exports = {typeDefs}
```
<p>First we import gql from Apollo Server, this will allow us to write GraphQl code inside a .js file</p>
<p>Then we write all the code we need, for this, we only want 2 queries: Get all users and Get a user by it's ID</p>
<p>Lastly we export the Type Defs</p>

<h2> 4 - Creating Resolvers</h2>

```
const {userList} = require("../fakeData")
const _ = require("lodash")

const resolvers = {

    Query: {

        users() {

            return userList ? {users: userList} : {message: "There was an error"}
        },
        user(parent, args, context, info) {

            const id = args.id //Get the id from args
            const user = _.find(userList, {id: Number(id)}) 

            return user

        },
       
    }

}

module.exports = {resolvers}
```

<p>First we import a fake data file, it contains fake info about users. And we also import lodash, it will be used to manage the fake data</p>
<p>Then we create the resolvers inside a const, the first resolver is users, it just returns all the users from fake data. The second one returns a user based on its ID </p>
<p>The args inside user() is the input that we need to pass.</p>

<h2> 5 - Testing the API</h2>

<p>We can test the api by accesing the link that we printed on terminal, it will lead us to Apollo Server Studio, then we can start writing our queries</p>

```
query GetAllUsers {
  users {
    id
    name
  }
}
```
<p>This query returns all users with the data we specified(id and name)</p>

```
query User($id: ID!) {
    user(id:  $id) {
      name
      id
  }
}
```

<p>This query returns a specific user, note that it needs a variable, on Apollo Studio, you define variables on the variables tab, below the code editor. With this, this query will return the name and id from the user</p>
