const express = require('express')
const functions = require('firebase-functions');
const cors = require('cors')
const admin = require('firebase-admin');

const app = express()

main.use(cors())
app.use(cors())
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

app.post('/', (req, res) => {
    const entry = req.body

    return admin.database().ref('/entries').push(entry)
        .then(() => {
            return res.status(200).send(entry)
        }).catch(error => {
            console.error(error)
            return res.status(500).send(`Oh no, Error ! ${error}`)
        })
    })


app.get('/', (req, res) => {
    return admin.database().ref('/entries').on('value', snapshot => {
        return res.status(200).send(snapshot.val())
    }, error => {
        console.error(error)
        return res.status(500).send(`Oh no, Error ! ${error}`)
    })
})

exports.entries = functions.https.onRequest(app)