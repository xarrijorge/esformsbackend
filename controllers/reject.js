const rejectRouter = require('express').Router()
const Client = require('../dbconnection')
const sgMail = require('@sendgrid/mail')

let denialMsg = require('../views/rejection')

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
        await Client.connect()
        const db = Client.db('esforms')
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
        await Client.close()
    }

    res.send(id)
})

rejectRouter.get('/reject/pettycash', async (req, res) => {
    const id = ObjectId(`${req.query.id}`)
    try {
        await Client.connect()
        const db = Client.db('esforms')
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
        await Client.close()
    }

    res.send(id)
})

rejectRouter.get('/reject/vehicle', async (req, res) => {
    const id = ObjectId(`${req.query.id}`)
    try {
        await Client.connect()
        const db = Client.db('esforms')
        const Collection = db.collection('vehicle')

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
        await Client.close()
    }

    res.send(id)
})

module.exports = rejectRouter
