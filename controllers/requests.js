const requestRouter = require('express').Router()
const Client = require('../dbconnection')
const sgMail = require('@sendgrid/mail')

let perdiemMsg = require('../views/requests/pdRequest')
let pettycashMsg = require('../views/requests/pcRequest')
let vhApproval = require('../views/approval/vhApproval')
const vhRequest = require('../views/requests/vhRequest')
let noApproval = [
    'eric@easysolar.org',
    'nthabi@easysolar.org',
    'alex@easysolar.org',
    'natty.davis@easysolar.org',
    'shamsu.mustapha@lib.easysolar.org',
    'ousmane@easysolar.org',
    'akam.kpaka@sl.easysolar.org',
    'zora.anthony@easysolar.org',
]
// let CreatePDF = require('../CreatePDF')

// eslint-disable-next-line no-undef
const EMAIL_URI = process.env.SG_URI
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

let user = {}

requestRouter.get('/users', async (req, res) => {
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

// requestRouter.post('/requests/perdiem', async (req, res) => {
//     const body = { ...req.body, user: { ...req.user }, submittedOn: new Date() }

//     try {
//         await Client.connect()
//         const db = Client.db('esforms')
//         const requestCollection = db.collection('requests')

//         await requestCollection.insertOne(body)
//         // await CreatePDF('views/perdiem.js', user)
//         await sendMail(perdiemMsg(body['user'], req, body._id))
//         return res.send(body)
//     } catch (err) {
//         console.log(err)
//     } finally {
//         await Client.close()
//     }
//     res.send(body)
// })
requestRouter.post('/requests/perdiem', async (req, res) => {
    const body = req.body
    try {
        await Client.connect()
        const db = Client.db('esforms')
        const requestCollection = db.collection('requests')

        await requestCollection.insertOne(req.body)
        await sendMail(perdiemMsg(body['user'], req, body._id))
        return res.send(body)
    } catch (err) {
        console.log(err)
    } finally {
        await Client.close()
    }
    res.send(body)
})

requestRouter.post('/requests/pettycash', async (req, res) => {
    const body = req.body
    try {
        await Client.connect()
        const db = Client.db('esforms')
        const pettyCashCollection = db.collection('pettycash')

        await pettyCashCollection.insertOne(req.body)
        await sendMail(pettycashMsg(body['user'], body, body._id))
        return res.send(body)
    } catch (err) {
        console.log(err)
    } finally {
        await Client.close()
    }
    res.send(body)
})

requestRouter.post('/requests/vehicle', async (req, res) => {
    const body = req.body
    const userEmail = body['user']['Employee Email Address']
    const other = body['thirdpartyemail']
    const msg =
        noApproval.includes(userEmail) || noApproval.includes(other)
            ? vhApproval
            : vhRequest
    try {
        await Client.connect()
        const db = Client.db('esforms')
        const vehicleCollection = db.collection('vehicle')

        await vehicleCollection.insertOne(req.body)
        await sendMail(msg(body['user'], body, body._id))
        return res.send(body)
    } catch (err) {
        console.log(err)
    } finally {
        await Client.close()
    }
    res.send(body)
})

module.exports = requestRouter
