const Vendor = require('../models/vendor-model')

createVendor = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a vendor'
        })
    }

    const vendor = new Vendor(body)

    if (!vendor) {
        return res.status(400).json({ success: false, error: err })
    }

    vendor
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                vendor: vendor,
                message: 'Vendor created'
            })
        })
}

updateVendor = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a vendor to update'
        })
    }

    Vendor.findOneAndUpdate({ _id: body._id}, body, {new: true}, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Vendor not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'vendor updated!',
                vendor: data
            })
        }
    })    
}

deleteVendor = async (req, res) => {
    await Vendor.findOneAndDelete({ _id: req.params.id }, (err, data) => {
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

getVendorById = async (req, res) => {
    await Vendor.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Vendor not found` })
        }
        return res.status(200).json({ success: true, vendor: data })
    }).catch(err => console.log(err))
}

getVendors = async (req, res) => {
    await Vendor.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Vendors not found` })
        }
        return res.status(200).json({ success: true, vendors: data})
    }).catch(err => console.log(err))
}

module.exports = {
    createVendor,
    updateVendor,
    deleteVendor,
    getVendors,
    getVendorById
}
