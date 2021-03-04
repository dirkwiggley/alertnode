const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Role = new Schema(
    {
        accountId: { type: String, required: false },
        accountName: { type: String, required: false },
        name: { type: String, required: true },
        note: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('role', Role)