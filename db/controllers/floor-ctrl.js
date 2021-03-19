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

    Floor.findOneAndUpdate({ _id: body._id}, body, {new: true}, (error, data) => {
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

    // accountId: { type: String, required: false },
    // accountName: { type: String, required: false },
    // siteId: { type: String, required: false },
    // siteName: { type: String, required: false },
    // buildingId: { type: String, required: false },
    // buildingName: { type: String, required: false },
    // name: { type: String, required: true },
addFloors = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Bad floor data'
        })
    }

    const floorName = "Floor "
    let errs = []
    for (let i = 1; i <= body.numOfFloors; i++) {
        const newFloorName = floorName + i
        floorBody = {}
        floorBody.accountId = body.accountId
        floorBody.accountName = body.accountName
        floorBody.siteId = body.siteId
        floorBody.siteName = body.siteName
        floorBody.buildingId = body.buildingId
        floorBody.buildingName = body.buildingName
        floorBody.name = newFloorName

        const floor = new Floor(floorBody)

        if (!floor) {
            errs.push(err)
        }
    
        await floor
            .save()
            .catch(error => errs.push(error))
    }
    if (errs.length > 0) {
        return res.status(400).json({ success: false, errors: errs})
    } else {
        return res.status(200).json({
            success: true,
            floors: { numOfFloors: body.numOfFloors, siteId: body.siteId, buildingId: body.buildingId },
            message: 'Floors created'
        })
    }
}


module.exports = {
    createFloor,
    addFloors,
    updateFloor,
    deleteFloor,
    getFloors,
    getFloorById,
    getFloorsByBuilding
}
