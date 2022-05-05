require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { errorHandler, unknownEndpoint, accessControl } = require('./utils')
const requestRouter = require('./controllers/requests')
const approveRouter = require('./controllers/requests')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

app.use(accessControl)

app.options('*', cors())

// app.use(logger)

app.get('/', (req, res) => {
    res.send('<h1>Horld!</h1>')
})
app.get('/users', requestRouter)
app.post('/requests/perdiem', requestRouter)
app.post('/requests/pettycash', requestRouter)
app.post('/requests/vehicle', requestRouter)
app.get('/approve/perdiem', approveRouter)
app.get('/reject', requestRouter)

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
