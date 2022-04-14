require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const sgMail = require('@sendgrid/mail')
const res = require('express/lib/response')

const MONGO_URI = process.env.MONGODB_URI
const EMAIL_URI = process.env.SG_URI

const MongoClient = require('mongodb').MongoClient
const Client = new MongoClient(MONGO_URI)

sgMail.setApiKey(EMAIL_URI)

const sendMail = async (msg) => {
    try {
        await sgMail.send(msg)
    } catch (error) {
        console.error(error)

        if (error.response) {
            console.error(error.response.body)
        }
    }
    console.log('email sent successfully')
}

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

app.get('/approve', async (req, res) => {
    res.send(
        '<h1>You have approved the transaction. The requester will receive confirmation</h1>'
    )
})
app.get('/reject', async (req, res) => {
    res.send(
        '<h1>You have rejected this transaction. The requester will be informed</h1>'
    )
})

let user = {}

app.get('/users', async (req, res) => {
    try {
        await Client.connect()
        const db = Client.db('esforms')
        const usersCollection = db.collection('users')

        const query = { 'Employee Email Address': `${req.query.email}` }
        user = await usersCollection.findOne(query)
        res.send(user)
    } catch (err) {
        console.log(err)
    } finally {
        await Client.close()
    }
})

app.post('/requests', async (req, res, next) => {
    const body = { ...req.body, user: { ...user }, submittedOn: new Date() }

    const msg = {
        to: user['Line Manager Email Address'],
        cc: ['muctarr.rahim@easysolar.org', 'randy.george@easysolar.org'],
        from: 'techadmin@easysolar.org', // Use the email address or domain you verified above
        subject: `Perdiem request from ${user['Full Name']}`,
        html: `
        <!DOCTYPE html>
<html>
    <head>
        <style>
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td,
            th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
            button{
    width: 150px;
    height: 40px;
    border-radius: 20px;
    border: none;
    font-size: 18px;
    margin: 0 10px;
    transition: all 0.2s ease-in-out;
  }
  button a{
    text-decoration: none;
    color: white;
  }
  button:hover{
    transform: scale(1.1)
  }
  .approve{
    background-color: green;
  }
  .reject{
    background-color: red;
  }
        </style>
    </head>
    <body>
        <img
            src="https://drive.google.com/file/d/1Fh2JymAGUbI9yEPbiaIYeoiKR7Kd0Oay/view?usp=sharing"
            width="100"
            height="100"
            alt="easy solar logo"
        />
        <h2>Per Diem Request from ${['Full Name']}, ${user['Job Title']}</h2>

        <table>
            <tr>
                <th>Question</th>
                <th>Response</th>
            </tr>
            <tr>
                <td>Destination</td>
                <td>${req.body.destination}</td>
            </tr>
            <tr>
                <td>Number of Nights</td>
                <td>${req.body.nights}</td>
            </tr>
            <tr>
                <td>Number of Days</td>
                <td>${req.body.days}</td>
            </tr>
            <tr>
                <td>Purpose of Trip</td>
                <td>${req.body.purpose}</td>
            </tr>
            <tr>
                <td>Vehicle Requested</td>
                <td>${req.body.vehicle}</td>
            </tr>
            <tr>
                <td>Number of Passengers</td>
                <td>${req.body.passengers}</td>
            </tr>
            <tr>
                <td>Special requests</td>
                <td>${req.body.requests}</td>
            </tr>
        </table>
        <h4>Claims</h4>
        <table>
            <th>item</th>
            <th>Amount</th>
            <tr>
                <td>Accommodation</td>
                <td>${
                    parseInt(req.body.nights) *
                    parseInt(user.Accommodation.replace(/[^a-z0-9]/gi, ''))
                }</td>
            </tr>
            <tr>
                <td>Meals</td>
                <td>${
                    parseInt(req.body.days) *
                    parseInt(user.Meals.replace(/[^a-z0-9]/gi, ''))
                }</td>
            </tr>
            <tfoot>
                <tr>
                    <td>TOTAL CLAIM</td>
                    <td>${req.body.TOTALCLAIM}</td>
                </tr>
            </tfoot>
        </table>

        <h3>Approval Section</h3>
        <button>
            <a href="https://shielded-plains-53385.herokuapp.com/approve"
                >Approve</a
            >
        </button>
        <button>
            <a href="https://shielded-plains-53385.herokuapp.com/reject"
                >Reject</a
            >
        </button>
    </body>
</html>
        
        `,
    }

    try {
        await Client.connect()
        const db = Client.db('esforms')
        const requestCollection = db.collection('requests')

        await requestCollection.insertOne(body)
        await sendMail(msg)
        res.send(body)
    } catch (err) {
        console.log(err)
    } finally {
        await Client.close()
    }
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
