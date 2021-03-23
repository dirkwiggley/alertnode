const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Feature = new Schema(
    {
        vendorId: { type: String, required: false },
        vendorName: { type: String, required: false },
        name: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('feature', Feature)