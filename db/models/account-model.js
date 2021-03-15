const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Accounts = new Schema(
    {
        name: { type: String, required: true },
        note: { type: String, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('accounts', Accounts)