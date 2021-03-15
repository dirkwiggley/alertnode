const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Unit = new Schema(
    {
        accountId: { type: String, required: false },
        accountName: { type: String, required: false },
        siteId: { type: String, required: false },
        siteName: { type: String, required: false },
        buildingId: { type: String, required: false },
        buildingName: { type: String, required: false },
        floorId: { type: String, required: false },
        floorName: { type: String, required: false },
        name: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('unit', Unit)