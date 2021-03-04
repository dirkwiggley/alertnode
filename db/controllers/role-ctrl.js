const Role = require('../models/role-model')

createRole = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an role'
        })
    }

    const role = new Role(body)

    if (!role) {
        return res.status(400).json({ success: false, error: err })
    }

    role
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: role._id,
                message: 'Role created'
            })
        })
}

updateRole = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an role to update'
        })
    }

    Role.replaceOne({ _id: body._id}, body, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Role not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'role updated!',
                data: data
            })
        }
    })    
}

deleteRole = async (req, res) => {
    await Role.findOneAndDelete({ _id: req.params.id }, (err, role) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!role) {
            return res
                .status(400)
                .json({ success: true })
        }
    })
}

getRoleById = async (req, res) => {
    await Role.findOne({ _id: req.params.id }, (err, role) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!role) {
            return res
                .status(404).json({ success: false, error: `Role not found` })
        }
        return res.status(200).json({ success: true, data: role })
    }).catch(err => console.log(err))
}

getRoles = async (req, res) => {
    await Role.find({}, (err, roles) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!roles.length) {
            return res
                .status(404)
                .json({ success: false, error: `Roles not found` })
        }
        return res.status(200).json({ success: true, data: roles})
    }).catch(err => console.log(err))
}

module.exports = {
    createRole,
    updateRole,
    deleteRole,
    getRoles,
    getRoleById
}
