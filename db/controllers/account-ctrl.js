const Account = require('../models/account-model')

createAccount = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an account'
        })
    }

    const account = new Account(body)

    if (!account) {
        return res.status(400).json({ success: false, error: err })
    }

    account
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: account._id,
                message: 'Account created'
            })
        })
}

updateAccount = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an account to update'
        })
    }

    Account.findOneAndUpdate({ _id: body._id}, body, {new: true}, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Account not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'account updated!',
                account: data
            })
        }
    })    
}

deleteAccount = async (req, res) => {
    await Account.findOneAndDelete({ _id: req.params.id }, (err, data) => {
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

getAccountById = async (req, res) => {
    await Account.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404).json({ success: false, error: `Account not found` })
        }
        return res.status(200).json({ success: true, account: data })
    }).catch(err => console.log(err))
}

getAccounts = async (req, res) => {
    await Account.find({}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Accounts not found` })
        }
        return res.status(200).json({ success: true, accounts: data})
    }).catch(err => console.log(err))
}

module.exports = {
    createAccount,
    updateAccount,
    deleteAccount,
    getAccounts,
    getAccountById
}
