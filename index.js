require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const URI = process.env.MONGODB_URI

const MongoClient = require('mongodb').MongoClient
const Client = new MongoClient(URI)

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, OPTIONS')
    next()
})

app.options('*', cors())

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)

app.get('/', (req, res) => {
    res.send('<h1>Horld!</h1>')
})

app.get('/users', async (req, res) => {
    try {
        await Client.connect()
        const db = Client.db('esforms')
        const usersCollection = db.collection('users')

        const query = { 'Employee Email Address': `${req.query.email}` }
        const user = await usersCollection.findOne(query)
        res.send(user)
    } finally {
        await Client.close()
    }
})

app.post('/requests', (req, res, next) => {
    const body = req.body
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
