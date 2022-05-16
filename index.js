require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { errorHandler, unknownEndpoint, accessControl } = require('./utils')
const requestRouter = require('./controllers/requests')
const approveRouter = require('./controllers/approve')
const rejectRouter = require('./controllers/reject')

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
app.get('/approve/pettycash', approveRouter)
app.get('/approve/vehicle', approveRouter)
app.get('/reject/perdiem', rejectRouter)
app.get('/reject/pettycash', rejectRouter)
app.get('/reject/vehicle', rejectRouter)

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
