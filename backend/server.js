import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

let currentId = 14
function increaseCurrentIdByOne() {
    currentId += 1
}
let inMemoryDatabase = [
    {
        id: 10,
        name: 'Go skydiving'
    },
    {
        id: 11,
        name: 'Win the lottery'
    },
    {
        id: 12,
        name: 'Buy a supercar'
    },
    {
        id: 13,
        name: 'Bang your dads wife'
    },
    {
        id: 14,
        name: 'Go bankrupt'
    },
    {
        id: 15,
        name: 'Hit rockbottom'
    },
]

function messageTODONotFound() {
    return {
        status: 404,
        text: 'TODO not found'
    }
}

function messageTODOSuccess(message) {
    return {
        status: 200,
        text: message
    }
}

function getTODOIndex(id) {
    for (let i = 0; i < inMemoryDatabase.length; i++) {
        if (inMemoryDatabase[i].id === id) {
            return i
        }
    }
}

function createNewTODO(TODOData) {
    let TODO = {
        id: currentId,
        name: TODOData.name
    }
    increaseCurrentIdByOne()
    inMemoryDatabase.push(TODO)
}

function getAllTODOs() {
    return inMemoryDatabase
}

function getTODOById(id) {
    let index = getTODOIndex(id) {
        if (index === -1) {
            return messageTODONotFound()
        } else {
            return messageTODOSuccess(inMemoryDatabase[index])
        }
    }
}

function updateTODO(TODOData) {
    let index = getTODOIndex(Number(TODOData.id))

    if (index === -1) {
        return messageTODONotFound()
    } else {
        if (inMemoryDatabase[index].name !== TODOData.name) {
            inMemoryDatabase[index].name = TODOData.name;
        }}}

function deleteTODO(index) {
    inMemoryDatabase.splice(index, 1)
}