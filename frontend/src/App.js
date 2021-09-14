import './App.css';
import {useState} from "react";
import http from './utils/api/UsersApi'

function App() {
    const [text, setText] = useState('paragraph')

    function alive() {
        http.get("/")
            .then(function (response) {
                console.log(response.data)
                setText(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error)
                return 'Error'
            })
            .then(function () {
                // Always executed
            })
    }

    function getUsers() {
        http.get('/users')
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function getUserById(id) {
        http.get(`/users/${id}`)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function createUser(name, age, gender) {
        const payLoad = {
            "name": name,
            "age": age,
            "gender": gender
        }
        http.post('/users', payLoad)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function updateUser(id, name, age, gender) {
        const payLoad = {
            "id": 14,
            "name": name,
            "age": age,
            "gender": gender
        }
        http.put('/users', payLoad)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div>
            <h1>Users API with Axios</h1>
            <h3>'npm install axios'</h3>
            <p>{text}</p>

            <button onClick={() => {
                setText('New Text')
            }}>New Text
            </button>
            <button onClick={alive}>alive</button>
            <button onClick={getUsers}>getUsers</button>
            {/*<button onClick={() => {*/}
            {/*    getUserById(14)*/}
            {/*}}>getUserById*/}
            {/*</button>*/}
            <button onClick={function () {
                getUserById(14)
            }}>getUserById
            </button>
            <button onClick={function () {
                createUser("Ada", 18, "Female")
            }}>createUser
            </button>
            <button onClick={function () {
                updateUser(14,"Ada", 19, "Female")
            }}>updateUser
            </button>
        </div>
    );
}

export default App;
