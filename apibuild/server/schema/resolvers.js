//From where the data is coming
const {userList, movieList} = require("../fakeData")
const _ = require("lodash")
const b = null

//All functions that do something in our API should be in resolvers
const resolvers = {

    //Query is the highest level field of the Graph, so we select it
    Query: {
        //users is a subfield of Query, it should get users data

        users(parent, args, context, info) {
            //Call to databases should be made here
            //Context is defined at index.js, context returns an object with any value, it can accesses in every resolver. It is useful to do authentication adn authorization checks
            //console.log(context) Will return the value of context, defined at index

            //console.log(info) Info returns info about the request, not the same as Req in Context

            return userList ? {users: userList} : {message: "There was an error"}
        },
        user(parent, args, context, info) {

            /*Parenting
                query -> users -> favoriteMovie
                The parent will be whatever the ancestor returns, in this case, query returns nothing, but users return a list of favorite movies, so users is the parent of favorite movie. Favorite Movie will get whatever users return
            */

            //Args is the params passed through the user query
            

            const id = args.id //Get the id from args
            const user = _.find(userList, {id: Number(id)}) //Then use lodash to search in userList for a user that have the same id as args

            return user

        },
        //Movies resolvers
        movies() {
            return movieList
        },
        movie(parent, args) {
            //We again get the params
            const name = args.name
            const movie = _.find(movieList, {name}) //Search for the movie with the name passed

            return movie
        }
    },
    User: {
        //We can add values to non-scalar types, for this we need to access the user Type and put the field name
        favoriteMovies(parent) {
            //console.log(parent) Returns the entire list of users
            return _.filter(movieList, (movie) => movie.year >= 2000 && movie.year <= 2010) //We set the favorite movies field to movies released between 2000 and 2010
        }
    },
    Mutation: {
        //Mutations are type of 'request' that changes data(create, update, delete)
        createUser(parent, args) {

            const user = args.input
            //The input is a json
            const lastId = userList[userList.length - 1].id //We get the last id

            user.id = lastId + 1

            userList.push(user)//Then we add the new user to the list
            return user

        },
        updateUsername(parent, args) {

            const {id, newUsername} = args.input //This time we dont need the user, just the id and the new username
            let updatedUser

            userList.forEach((user) => {
                if (user.id == id) {
                    //We check if any id of the list matches with the id pased, if so, we update the data
                    user.username = newUsername 
                    updatedUser = user
                }
             })

             return updatedUser

        },
        deleteUser(parent, args) {

            const id = args.id
            _.remove(userList, (user) => user.id === Number(id)) //We search for any id in the list that matches, then we delete the user with that id
            return null

        }
    },
    //ResolveTypes are used in Unions, they should return 1 of 2 possibilities, if there was an error then return the error message, if not, return the user list
    //Unions are a composer type of two or more types, the union must return the type UsersSuccess or UsersError
    UsersResult: {
        __resolveType(obj) { //This function of ApolloServer is responsible for determine the corret type and return it
            //obj is the return of users query
            if(obj.users) {
                return "UsersSuccess"
            }else if (obj.message) {
                return "UsersError"
            }

            return null

        }
    }

}

module.exports = {resolvers}