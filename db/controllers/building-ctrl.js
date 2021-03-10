const Building = require('../models/building-model')

createBuilding = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an building'
        })
    }

    const building = new Building(body)

    if (!building) {
        return res.status(400).json({ success: false, error: err })
    }

    building
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: building._id,
                message: 'Building created'
            })
        })
}

updateBuilding = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an building to update'
        })
    }

    Building.replaceOne({ _id: body._id}, body, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Building not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'building updated!',
                data: data
            })
        }
    })    
}

deleteBuilding = async (req, res) => {
    await Building.findOneAndDelete({ _id: req.params.id }, (err, building) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!building) {
            return res
                .status(400)
                .json({ success: true })
        }
    })
}

getBuildingById = async (req, res) => {
    await Building.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Building not found` })
        }
        return res.status(200).json({ success: true, building: data })
    }).catch(err => console.log(err))
}

getBuildingsBySite = async (req, res) => {
    await Building.find({ siteId: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Buildings not found` })
        }
        return res.status(200).json({ success: true, buildings: data })
    }).catch(err => console.log(err))
}

getBuildings = async (req, res) => {
    await Building.find({}, (err, buildings) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!buildings.length) {
            return res
                .status(404)
                .json({ success: false, error: `Buildings not found` })
        }
        return res.status(200).json({ success: true, data: buildings})
    }).catch(err => console.log(err))
}

module.exports = {
    createBuilding,
    updateBuilding,
    deleteBuilding,
    getBuildings,
    getBuildingsBySite,
    getBuildingById
}
