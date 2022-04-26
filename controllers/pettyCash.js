const Client = require('../dbconnection')
const pettyCashRouter = require('express').Router()

pettyCashRouter.post('/pettycash', async (req, res) => {
    try {
        await Client.connect()
        const db = Client.db('esforms')
        const pettyCashCollection = db.collection('pettycash')

        await pettyCashCollection.insertOne(req.body)
        res.send(req.body)
    } catch (err) {
        console.log(err)
    } finally {
        await Client.close()
    }
})

module.exports = pettyCashRouter
