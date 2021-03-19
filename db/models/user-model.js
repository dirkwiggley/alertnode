const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        login: { type: String, required: true },
        password: { type: String, required: true},
        name: { type: String, required: true },
        email: { type: String, required: false },
        isAdmin: { type: Boolean, required: true },
        isUser: { type: Boolean, required: true },
        accountId: { type: String, required: false },
        siteId: { type: String, required: false },
        buildingId: { type: String, required: false },
        floorId: { type: String, required: false },
        unitId: { type: String, required: false },
        roomId: { type: String, required: false },
        token: { 
            id: { type: String, required: false }, 
            issued: { type: Number, required: false }, 
            expires: { type: Number, required: false } 
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('user', User)