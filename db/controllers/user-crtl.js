// UUID from https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require('uuid')
const sha256 = require('js-sha256');
const User = require('../models/user-model')
insertUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No user sent!'
        })
    }

    const user = new User(body)
    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                user: user,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    let token = createToken();
    body.token = token;

    User.findOneAndUpdate({ _id: body._id}, body, {new: true}, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'User not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'User updated!',
                user: data
            })
        }
    })    
}


deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, user: user })
    }).catch(err => console.log(err))
}

getAllUsers = async (req, res) => {
    const byLogin = { login: 1 }
    await User.find({}, (err, user) => {
        result = user;
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
    }).sort(byLogin).exec(function(err, result) {
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        }
        const users = result.map(user => {
            return { id: user._id, login: user.login, name: user.name, nickname: user.nickname, isAdmin: user.isAdmin, isUser: user.isUser };
        })

        return res.status(200).json({ success: true, users: users })
    })
}

createToken = () => {
    let token = uuidv4()
    let created = new Date().getTime();
    let minutes = 30;
    let expires = created + minutes * 60000;
    return { id: token, expires: expires, issued: created }
}

login = async (req, res) => {
    await User.findOne({ login: req.body.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        if (req.body.password === user.password) {
            let token = createToken()
            user.token = token
            user.save().then(() => {
                return res.status(200).json({
                    success: true,
                    user: user,
                    message: 'User logged in!',
                })
            })
            .catch(error => {
                return res.status(400).json({ success: false, error: "Could not update token" })
            })
        } else {
            return res.status(400).json({ success: false, error: "Login id and/or Password not correct" })
        }
    }).catch(err => console.log(err))
}

/**
 * req.body.id : userId
 * req.body.token : token
 */
refreshToken = async (req, res) => {
    await User.findOne({ login: req.body.login }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        let now = new Date().getTime()
        if (user.token.id != req.body.token) {
            return res.status(400).json({ 
                success: false, 
                error: `Invalid token sent. Expected ${user.token.id} got ${req.body.token}` })
        }
        let expires = user.token.expires;

        if (now < expires) {
            let newToken = createToken();
            user.token = newToken;
            user.save().then(() => {
                return res.status(200).json({
                    success: true,
                    token: newToken,
                    message: 'Token aquired!',
                })
            })
            .catch(error => {
                return res.status(400).json({ success: false, error: "Could not update token" })
            })
        } else {
            user.token = null
            user.save().then(() => {
                return res.status(400).json({ success: false, error: "Token expired" })
            })
            .catch(error => {
                return res.status(400).json({ success: false, error: "Token expired: Could not update token" })
            })
        }
    }).catch(err => console.log(err))
}

checkToken = async (req, res) => {
    await User.findOne( { login: req.body.login }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        if (!user.token) {
            return res
                .status(404)
                .json({ success: false, error: `Token not found` })
        }

        let now = new Date().getTime()
        if (user.token.id != req.body.token) {
            return res.status(400).json({ success: false, error: "Invalid token sent" })
        }
        
        if (now < user.token.expires) {
            return res.status(200).json({
                success: true,
                message: 'Token valid',
            })
        } else {
            return res.status(400).json({ success: false, error: "Token expired" });
        }
    } );
}

module.exports = {
    insertUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    login,
    refreshToken,
    checkToken
}