const rejectRouter = require('express').Router()
const Mongo_Client = require('../helpers/dbconnection')
const sgMail = require('@sendgrid/mail')

let denialMsg = require('../views/rejection')
const createAsanaTask = require('../helpers/asanaConnection')

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

const ObjectId = require('mongodb').ObjectId

rejectRouter.get('/reject/perdiem', async (req, res) => {
    const id = ObjectId(`${req.query.id}`)
    try {
        await Mongo_Client.connect()
        const db = Mongo_Client.db('esforms')
        const Collection = db.collection('requests')

        const query = { _id: id }
        const request = await Collection.findOne(query)
        const user = request.user
        await sendMail(denialMsg(user, request))
        return res.send(
            'You have denied this request. Relevant Parties will be notified.'
        )
    } catch (err) {
        console.log(err)
    } finally {
        await Mongo_Client.close()
    }

    res.send(id)
})

rejectRouter.get('/reject/pettycash', async (req, res) => {
    const id = ObjectId(`${req.query.id}`)
    try {
        await Mongo_Client.connect()
        const db = Mongo_Client.db('esforms')
        const Collection = db.collection('pettycash')

        const query = { _id: id }
        const request = await Collection.findOne(query)
        const user = request.user
        await sendMail(denialMsg(user, request))
        return res.send(
            'You have denied this request. Relevant Parties will be notified.'
        )
    } catch (err) {
        console.log(err)
    } finally {
        await Mongo_Client.close()
    }

    res.send(id)
})

rejectRouter.get('/reject/vehicle', async (req, res) => {
    const id = ObjectId(`${req.query.id}`)
    try {
        // Posting to the Database
        await Mongo_Client.connect()
        const db = Mongo_Client.db('esforms')
        const Collection = db.collection('vehicle')

        const query = { _id: id }
        const request = await Collection.findOne(query)
        const user = request.user
        // Sending the email via SendGrid
        await sendMail(denialMsg(user, request))
        // Creating the Asana Task
        createAsanaTask(req)
        return res.send(
            'You have denied this request. Relevant Parties will be notified.'
        )
    } catch (err) {
        console.log(err)
    } finally {
        await Mongo_Client.close()
    }

    res.send(id)
})

module.exports = rejectRouter
