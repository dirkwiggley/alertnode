const Unit = require('../models/unit-model')

createUnit = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an unit'
        })
    }

    const unit = new Unit(body)

    if (!unit) {
        return res.status(400).json({ success: false, error: err })
    }

    unit
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: unit._id,
                message: 'Unit created'
            })
        })
}

updateUnit = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an unit to update'
        })
    }

    Unit.findOneAndUpdate({ _id: body._id}, body, {new: true}, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Unit not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'unit updated!',
                unit: data
            })
        }
    })    
}

deleteUnit = async (req, res) => {
    await Unit.findOneAndDelete({ _id: req.params.id }, (err, data) => {
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

getUnitById = async (req, res) => {
    await Unit.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Unit not found` })
        }
        return res.status(200).json({ success: true, unit: data })
    }).catch(err => console.log(err))
}

getUnitsByFloor = async (req, res) => {
    await Unit.find({ floorId: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Units not found` })
        }
        return res.status(200).json({ success: true, units: data })
    }).catch(err => console.log(err))
}

getUnits = async (req, res) => {
    await Unit.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Units not found` })
        }
        return res.status(200).json({ success: true, data: units})
    }).catch(err => console.log(err))
}

module.exports = {
    createUnit,
    updateUnit,
    deleteUnit,
    getUnits,
    getUnitById,
    getUnitsByFloor
}
