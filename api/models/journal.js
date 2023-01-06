const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JournalSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
})

const Journal = mongoose.model("Journal", JournalSchema)

module.exports = Journal