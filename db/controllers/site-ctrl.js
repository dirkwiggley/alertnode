const Site = require('../models/site-model')

createSite = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an site'
        })
    }

    const site = new Site(body)

    if (!site) {
        return res.status(400).json({ success: false, error: err })
    }

    await site
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                site: site,
                message: 'Site created'
            })
        })
        .catch(error => {
            return res.stats(400).json({
                success: false,
                message: error
            })
        })
}

updateSite = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an site to update'
        })
    }

    await Site.findOneAndUpdate({ _id: body._id}, body, {new: true}, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Site not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'site updated!',
                site: data
            })
        }
    })    
}

deleteSite = async (req, res) => {
    await Site.findOneAndDelete({ _id: req.params.id }, (err, site) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!site) {
            return res
                .status(400)
                .json({ success: true })
        }
    })
}

getSiteById = async (req, res) => {
    await Site.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Site not found` })
        }
        return res.status(200).json({ success: true, site: data })
    }).catch(err => console.log(err))
}

getSitesByAccount = async (req, res) => {
    await Site.find({ accountId: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Sites not found` })
        }
        return res.status(200).json({ success: true, sites: data })
    }).catch(err => console.log(err))
}

getSites = async (req, res) => {
    await Site.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Sites not found` })
        }
        return res.status(200).json({ success: true, sites: data})
    }).catch(err => console.log(err))
}

module.exports = {
    createSite,
    updateSite,
    deleteSite,
    getSites,
    getSiteById,
    getSitesByAccount
}
