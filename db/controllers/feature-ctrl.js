const Feature = require('../models/feature-model')

createFeature = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a feature'
        })
    }

    const feature = new Feature(body)

    if (!feature) {
        return res.status(400).json({ success: false, error: err })
    }

    feature
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                feature: feature,
                message: 'Feature created'
            })
        })
}

updateFeature = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a feature to update'
        })
    }

    Feature.findOneAndUpdate({ _id: body._id}, body, {new: true}, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Feature not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'feature updated!',
                feature: data
            })
        }
    })    
}

deleteFeature = async (req, res) => {
    await Feature.findOneAndDelete({ _id: req.params.id }, (err, data) => {
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

getFeatureById = async (req, res) => {
    await Feature.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Feature not found` })
        }
        return res.status(200).json({ success: true, feature: data })
    }).catch(err => console.log(err))
}

getFeatures = async (req, res) => {
    await Feature.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Features not found` })
        }
        return res.status(200).json({ success: true, features: data})
    }).catch(err => console.log(err))
}

module.exports = {
    createFeature,
    updateFeature,
    deleteFeature,
    getFeatures,
    getFeatureById
}
