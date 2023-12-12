//From where the data is coming
const {userList} = require("../fakeData")

//All functions that do something in our API should be in resolvers
const resolvers = {

    //Query is the highest level field of the Graph, so we select it
    Query: {
        //users is a subfield of Query, it should get users data
        users() {
            //Call to databases should be made here
            return userList
        }
    }

}

module.exports = {resolvers}