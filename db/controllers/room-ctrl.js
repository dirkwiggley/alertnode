const Room = require('../models/room-model')

createRoom = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an room'
        })
    }

    const room = new Room(body)

    if (!room) {
        return res.status(400).json({ success: false, error: err })
    }

    room
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: room._id,
                message: 'Room created'
            })
        })
}

updateRoom = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an room to update'
        })
    }

    Room.replaceOne({ _id: body._id}, body, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Room not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'room updated!',
                data: data
            })
        }
    })    
}

deleteRoom = async (req, res) => {
    await Room.findOneAndDelete({ _id: req.params.id }, (err, room) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!room) {
            return res
                .status(400)
                .json({ success: true })
        }
    })
}

getRoomById = async (req, res) => {
    await Room.findOne({ _id: req.params.id }, (err, room) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!room) {
            return res
                .status(404).json({ success: false, error: `Room not found` })
        }
        return res.status(200).json({ success: true, data: room })
    }).catch(err => console.log(err))
}

getRoomsByUnit = async (req, res) => {
    await Room.find({ unitId: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Rooms not found` })
        }
        return res.status(200).json({ success: true, rooms: data })
    }).catch(err => console.log(err))
}

getRooms = async (req, res) => {
    await Room.find({}, (err, rooms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!rooms.length) {
            return res
                .status(404)
                .json({ success: false, error: `Rooms not found` })
        }
        return res.status(200).json({ success: true, data: rooms})
    }).catch(err => console.log(err))
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getRooms,
    getRoomById,
    getRoomsByUnit
}
