const AlarmType = require('../models/alarmType-model')

createAlarmType = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an alarm type'
        })
    }

    const alarmType = new AlarmType(body)

    if (!alarmType) {
        return res.status(400).json({ success: false, error: err })
    }

    alarmType
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                alarmType: alarmType,
                message: 'Alarm Type created'
            })
        })
        .catch(error => {
            return res.stats(400).json({
                success: false,
                error: error
            })
        } )
}

updateAlarmType = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an alarm Type to update'
        })
    }

    AlarmType.findOneAndUpdate({ _id: body._id}, body, {new: true}, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Alarm Type not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'Alarm Type updated!',
                alarmType: data
            })
        }
    })    
}

deleteAlarmType = async (req, res) => {
    await AlarmType.findOneAndDelete({ _id: req.params.id }, (err, data) => {
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

getAlarmTypeById = async (req, res) => {
    await AlarmType.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Alarm Type not found` })
        }
        return res.status(200).json({ success: true, alarmType: data })
    }).catch(err => console.log(err))
}

getAlarmTypes = async (req, res) => {
    await AlarmType.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Alarm Types not found` })
        }
        return res.status(200).json({ success: true, alarmTypes: data})
    }).catch(err => console.log(err))
}

module.exports = {
    createAlarmType,
    updateAlarmType,
    deleteAlarmType,
    getAlarmTypes,
    getAlarmTypeById
}
