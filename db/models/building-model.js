const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Building = new Schema(
    {
        accountId: { type: String, required: false },
        accountName: { type: String, required: false },
        siteId: { type: String, required: false },
        siteName: { type: String, required: false },
        name: { type: String, required: true },
        note: { type: String, required: false },
        address: {
            addressLine1:  { type: String, required: true },
            addressLine2:  { type: String, required: false },
            city: { type: String, required: true },
            stateProvince: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        floors: [ {
            id: { type: String, required: false },
            name: { type: String, required: false },
            note: { type: String, required: false },
        } ]
    },
    { timestamps: true }
)

module.exports = mongoose.model('building', Building)