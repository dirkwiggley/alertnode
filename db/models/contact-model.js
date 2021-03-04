const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema(
    {
        accountId: { type: String, required: false },
        name: { type: String, required: true },
        title: { type: String, required: true},
        roles: [
            {
                roleId: { type: String, required: true },
                name: { type: String, required: true }
            }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model('role', Role)