import express from 'express';
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Här finns databas relaterat
let currentId = 14

function incrementCurrentIdByOne() {
    currentId += 1
}

let inMemoryDataBase = [
    {
        id: 10,
        name: 'Adam',
        age: 12,
        gender: 'Male',
    },
    {
        id: 11,
        name: 'Bengtina',
        age: 24,
        gender: 'Female',
    },
    {
        id: 12,
        name: 'Cecilia',
        age: 36,
        gender: 'Female',
    },
    {
        id: 13,
        name: 'David',
        age: 48,
        gender: 'Male',
    },
]

// Svar i kommunikation från API
function messageUserNotFound() {
    return {
        status: 404,
        text: 'User not found!'
    }
}

function messageSuccess(message) {
    return  {
        status: 200,
        text: message
    }
}

// Sök i databasen
function getUserIndex (id) {
    for (let i = 0; i < inMemoryDataBase.length; i++) {
        if (inMemoryDataBase[i].id === id) {
            return i
        }
    }
    return -1
}

// CRUD = Create, Read, Update, Delete
function createNewUser(userData) {
    let user = {
        id: currentId,
        name: userData.name,
        age: userData.age,
        gender: userData.gender,
    }
    incrementCurrentIdByOne()
    inMemoryDataBase.push(user)
}

function getAllUsers() {
    return inMemoryDataBase
}

function getUserById(id) {
    let index = getUserIndex(id)

    if (index === -1) {
        return messageUserNotFound()
    } else {
        return messageSuccess(inMemoryDataBase[index])
    }
}

function updateUser(userData) {
    let index = getUserIndex(userData.id)

    if (index === -1) {
        return messageUserNotFound()
    } else {
        if (inMemoryDataBase[index].name !== userData.name) {
            inMemoryDataBase[index].name = userData.name
        }
        if (inMemoryDataBase[index].age !== userData.age) {
            inMemoryDataBase[index].age = userData.age
        }
        if (inMemoryDataBase[index].gender !== userData.gender) {
            inMemoryDataBase[index].gender = userData.gender
        }
        return messageSuccess('User updated!')
    }
}

function deleteUser(index) {
    inMemoryDataBase.splice(index, 1)
}

function deleteUserById(id) {
    let index = getUserIndex(id)

    if (index === -1) {
        return messageUserNotFound()
    } else {
        deleteUser(index)
        return messageSuccess('User deleted successfully!')
    }
}

// Kontrollerar att APIet lever
app.get('/', function (req,res) {
    res.send('API is Alive!')
})

// API CRUD
app.post('/users', function (req, res) {
    createNewUser(req.body)
    res.json('Successfully created a new user')
})

app.get('/users', function (req, res) {
    res.json(getAllUsers())
})

app.get('/users/:id', function (req, res) {
    const id = Number(req.params.id)
    let response = getUserById(id)
    res.status(response.status).json(response.text)
})

app.put('/users', function (req, res) {
    let response = updateUser(req.body)
    res.status(response.status).send(response.text)
})

app.delete('/users/:id', function (req, res) {
    let response = deleteUserById(Number(req.params.id))
    res.status(response.status).send(response.text)
});

// Måste lägga till alltid i sist = Startar servern
app.listen(port, () => {
    console.log(`The server is running on port ${ port }`)
})