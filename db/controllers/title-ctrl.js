const Title = require('../models/title-model')

createTitle = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an title'
        })
    }

    const title = new Title(body)

    if (!title) {
        return res.status(400).json({ success: false, error: err })
    }

    title
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: title._id,
                message: 'Title created'
            })
        })
}

updateTitle = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an title to update'
        })
    }

    Title.replaceOne({ _id: body._id}, body, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Title not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'title updated!',
                data: data
            })
        }
    })    
}

deleteTitle = async (req, res) => {
    await Title.findOneAndDelete({ _id: req.params.id }, (err, title) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!title) {
            return res
                .status(400)
                .json({ success: true })
        }
    })
}

getTitleById = async (req, res) => {
    await Title.findOne({ _id: req.params.id }, (err, title) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!title) {
            return res
                .status(404).json({ success: false, error: `Title not found` })
        }
        return res.status(200).json({ success: true, data: title })
    }).catch(err => console.log(err))
}

getTitles = async (req, res) => {
    await Title.find({}, (err, titles) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!titles.length) {
            return res
                .status(404)
                .json({ success: false, error: `Titles not found` })
        }
        return res.status(200).json({ success: true, data: titles})
    }).catch(err => console.log(err))
}

module.exports = {
    createTitle,
    updateTitle,
    deleteTitle,
    getTitles,
    getTitleById
}
