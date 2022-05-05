const approveRouter = require('express').Router()
const Client = require('../dbconnection')
const sgMail = require('@sendgrid/mail')

let approveMsg = require('../views/approval')

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

approveRouter.get('/approve/perdiem', async (req, res) => {
    const id = ObjectId(`${req.query.id}`)
    try {
        await Client.connect()
        const db = Client.db('esforms')
        const reqCollection = db.collection('requests')

        const query = { _id: id }
        const request = await reqCollection.findOne(query)
        const user = request.user
        await sendMail(approveMsg(user, request))
        return res.send(
            'You have approved this request. Relevant Parties will be notified.'
        )
    } catch (err) {
        console.log(err)
    } finally {
        await Client.close()
    }

    res.send(id)
})
approveRouter.get('/approve/pettycash', async (req, res) => {
    const id = ObjectId(`${req.query.id}`)
    try {
        await Client.connect()
        const db = Client.db('esforms')
        const reqCollection = db.collection('pettycash')

        const query = { _id: id }
        const request = await reqCollection.findOne(query)
        const user = request.user
        // await sendMail(approveMsg(user, request))
        return res.send(
            'You have approved this request. Relevant Parties will be notified.'
        )
    } catch (err) {
        console.log(err)
    } finally {
        await Client.close()
    }

    res.send(id)
})

module.exports = approveRouter
