const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Model = new Schema(
    {
        vendorId: { type: String, required: false },
        vendorName: { type: String, required: false },
        alarmTypeId: { type: String, required: false },
        alarmTypeName: { type: String, required: false },
        name: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('model', Model)