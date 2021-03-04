const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Title = new Schema(
    {
        accountId: { type: String, required: false },
        accountName: { type: String, required: false },
        name: { type: String, required: true },
        note: { type: String, required: false },
        roles: [
            { id: { type: String, required: false},
              name: { type: String, required: false} }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model('title', Title)