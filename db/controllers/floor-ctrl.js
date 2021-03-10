const Floor = require('../models/floor-model')

createFloor = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an floor'
        })
    }

    const floor = new Floor(body)

    if (!floor) {
        return res.status(400).json({ success: false, error: err })
    }

    floor
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: floor._id,
                message: 'Floor created'
            })
        })
}

updateFloor = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an floor to update'
        })
    }

    Floor.replaceOne({ _id: body._id}, body, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Floor not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'floor updated!',
                floor: data
            })
        }
    })    
}

deleteFloor = async (req, res) => {
    await Floor.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(400)
                .json({ success: true })
        }
    })
}

getFloorById = async (req, res) => {
    await Floor.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Floor not found` })
        }
        return res.status(200).json({ success: true, floor: data })
    }).catch(err => console.log(err))
}

getFloorsByBuilding = async (req, res) => {
    await Floor.find({ buildingId: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Floors not found` })
        }
        return res.status(200).json({ success: true, floors: data })
    }).catch(err => console.log(err))
}

getFloors = async (req, res) => {
    await Floor.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Floors not found` })
        }
        return res.status(200).json({ success: true, floors: data})
    }).catch(err => console.log(err))
}

module.exports = {
    createFloor,
    updateFloor,
    deleteFloor,
    getFloors,
    getFloorById,
    getFloorsByBuilding
}
