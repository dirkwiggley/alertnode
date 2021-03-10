const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Building = new Schema(
    {
        accountId: { type: String, required: false },
        accountName: { type: String, required: false },
        siteId: { type: String, required: false },
        siteName: { type: String, required: false },
        name: { type: String, required: true },
        address: {
            addressLine1:  { type: String, required: false },
            addressLine2:  { type: String, required: false },
            city: { type: String, required: false },
            stateProvince: { type: String, required: false },
            postalCode: { type: String, required: false },
            country: { type: String, required: false },
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