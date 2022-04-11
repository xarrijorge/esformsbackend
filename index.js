require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const Contact = require('./models/contactsModel')
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

let users = [
    {
        LastName: 'George',
        FirstName: 'Randy Xarrie',
        FullName: 'Randy Xarrie George',
        JobTitle: 'System Admin/Development Operations Officer',
        Department: 'IT',
        LineManagerName: 'Ousmane Diallo',
        LineManagerEmailAddress: 'ousmane@easysolar.org',
        EmployeeEmailAddress: 'randy.george@easysolar.org',
        Accommodation: '300,000',
        Meals: '50,000',
    },
    {
        LastName: 'Rahim',
        FirstName: 'Muctarr',
        FullName: 'Muctarr Rahim',
        JobTitle: 'System Admin/Development Operations Officer',
        Department: 'IT',
        LineManagerName: 'Ousmane Diallo',
        LineManagerEmailAddress: 'ousmane@easysolar.org',
        EmployeeEmailAddress: 'muctarr.rahim@easysolar.org',
        Accommodation: '300,000',
        Meals: '50,000',
    },
]

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

app.get('/users', (req, res, next) => {
    res.json(users)
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
