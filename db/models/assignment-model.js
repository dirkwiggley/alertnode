const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Assignment = new Schema(
    {
        accountId: { type: String, required: false },
        name: { type: String, required: true },
        contactId: { type: String, required: true },
        roleId: [ { type: String, required: true } ],
        roomId: [ { type: String, required: true } ]
    },
    { timestamps: true }
)

module.exports = mongoose.model('assignment', Assignment)