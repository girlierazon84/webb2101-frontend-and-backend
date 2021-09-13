import express from 'express';
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({extended: false}))
app.use(express.json())

let currentId = 14

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
function incrementCurrentIdByOne() {
    currentId += 1
}

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

function deleteUser(index) {
    inMemoryDataBase.splice(index, 1)
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

function getUserIndex (id) {
    for (let i = 0; i < inMemoryDataBase.length; i++) {
        if (inMemoryDataBase[i].id === id) {
           return i
        }
    }
    return -1
}

function getUserById(id) {
    let index = getUserIndex(id)

    if (index === -1) {
        return messageUserNotFound()
    } else {
        return messageSuccess(inMemoryDataBase[index])
    }
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

app.get('/', function (req,res) {
    res.send('API is Alive!')
})

app.get('/users', function (req, res) {
    res.json(inMemoryDataBase)
})

app.get('/users/:id', function (req, res) {
    const id = Number(req.params.id)
    let response = getUserById(id)
    res.status(response.status).json(response.text)
})

app.post('/users', function (req, res) {
    createNewUser(req.body)
    res.json('Successfully created a new user')
})

app.put('/users', function (req, res) {
    let response = updateUser(req.body)
    res.status(response.status).send(response.text)
})

app.delete('/users/:id', function (req, res) {
    let response = deleteUserById(Number(req.params.id))
    res.status(response.status).send(response.text)
});

app.listen(port, () => {
    console.log(`The server is running on port ${ port }`)
})