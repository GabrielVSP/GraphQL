const userList = [

    {
        id: 1,
        name: 'Drive',
        username: 'drive',
        age: 16,
        nationality: 'BRAZIL',
        friends: [
            {
                id: 2,
                name: 'Akinori',
                username: 'Akinori',
                age: 18,
                nationality: 'CANADA'
            },
            {
                id: 3,
                name: 'Mel',
                username: 'Mel',
                age: 17,
                nationality: 'FRANCE'
            },
        ]
    },
    {
        id: 2,
        name: 'Akinori',
        username: 'Akinori',
        age: 18,
        nationality: 'CANADA',
        friends: [
            {
                id: 3,
                name: 'Mel',
                username: 'Mel',
                age: 17,
                nationality: 'FRANCE'
            },
        ]
    },
    {
        id: 3,
        name: 'Mel',
        username: 'Mel',
        age: 17,
        nationality: 'FRANCE'
    },
    {
        id: 4,
        name: 'ASDFG',
        username: 'SSSS',
        age: 16,
        nationality: 'GERMANY'
    },
]

const movieList = [
    {
        id: 1,
        name: 'Django Unchained',
        year: 2013,
        isInTheaters: false
    },
    {
        id: 2,
        name: 'Ice Age',
        year: 2007,
        isInTheaters: false
    },
    {
        id: 3,
        name: 'Rush Hour 2',
        year: 2002,
        isInTheaters: false
    },
    {
        id: 4,
        name: 'Pirates Of Caribbean',
        year: 2007,
        isInTheaters: false
    },
    {
        id: 5,
        name: 'Five Nights at Freddy',
        year: 2023,
        isInTheaters: true
    },
]


module.exports = {userList, movieList}
