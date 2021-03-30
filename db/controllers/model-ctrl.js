const Model = require('../models/model-model')

createModel = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a model'
        })
    }

    const model = new Model(body)

    if (!model) {
        return res.status(400).json({ success: false, error: err })
    }

    model
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                model: model,
                message: 'Model created'
            })
        })
}

updateModel = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a model to update'
        })
    }

    Model.findOneAndUpdate({ _id: body._id}, body, {new: true}, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Model not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'model updated!',
                model: data
            })
        }
    })    
}

deleteModel = async (req, res) => {
    await Model.findOneAndDelete({ _id: req.params.id }, (err, data) => {
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

getModelById = async (req, res) => {
    await Model.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Model not found` })
        }
        return res.status(200).json({ success: true, model: data })
    }).catch(err => console.log(err))
}

getModelsByVendorId = async (req, res) => {
    await Model.find({ vendorId: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Models not found` })
        }
        return res.status(200).json({ success: true, models: data})
    }).catch(err => console.log(err))
}

getModels = async (req, res) => {
    await Model.find({  }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Models not found` })
        }
        return res.status(200).json({ success: true, models: data})
    }).catch(err => console.log(err))
}

module.exports = {
    createModel,
    updateModel,
    deleteModel,
    getModelById,
    getModelsByVendorId,
    getModels
}
