//From where the data is coming
const {userList, movieList} = require("../fakeData")
const _ = require("lodash")

//All functions that do something in our API should be in resolvers
const resolvers = {

    //Query is the highest level field of the Graph, so we select it
    Query: {
        //users is a subfield of Query, it should get users data

        users() {
            //Call to databases should be made here
            return userList
        },
        user(parent, args) {

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
        favoriteMovies() {
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
    }

}

module.exports = {resolvers}