const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/journal", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
.catch(console.error)

const Journal = require('./models/journal')

app.get('/journal_entries', async (req, res) => {
    const journal_entries = await Journal.find()
    res.json(journal_entries)
})

app.post('/journal/new', (req, res) => {
    const journal = new Journal({
        text: req.body.text
    })

    journal.save()
    res.json(journal)
})

app.delete('/journal/delete/:id', async (req, res) => {
    const result = await Journal.findByIdAndDelete(req.params.id)

    res.json({result})
})
app.get('/journal/complete/:id', async (req, res) => {
    const journal = await Journal.findById(req.params.id)

    journal.complete = !journal.complete

    journal.save()

    res.json(journal)
})

app.listen(3001, () => console.log("Server started on port 3001"))
