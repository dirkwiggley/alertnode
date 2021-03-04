const Contact = require('../models/contact-model')

async function saveContact(body, errMsg1, errMsg2) {
    return new Promise((resolve, reject) => {
        const contact = new Contact(body)
        if (!contact) {
            reject( { status: 400, message: errMsg1, errMsg2} )
        }
    
        Contact.findOne({ name: body.name }, (err, foundContact) => {
            if (err) {
                reject( { status: 401, error: error, message: errMsg2} )
            }
    
            if (!foundContact) {
                contact
                .save()
                .catch(error => {
                    reject( { status: 401, error: error, message: errMsg2} )
                })
            }
    
            resolve()
        }).catch(err => console.log(err))
    })
}

createContact = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an contact'
        })
    }

    const contact = new Contact(body)

    if (!contact) {
        return res.status(400).json({ success: false, error: err })
    }

    contact
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: contact._id,
                message: 'Contact created'
            })
        })
}

updateContact = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an contact to update'
        })
    }

    Contact.replaceOne({ _id: body._id}, body, (error, data) => {
        if (error) {
            return res.status(404).json({
                error,
                message: 'Contact not updated!',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'contact updated!',
                data: data
            })
        }
    })    
}

deleteContact = async (req, res) => {
    await Contact.findOneAndDelete({ _id: req.params.id }, (err, contact) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!contact) {
            return res
                .status(400)
                .json({ success: true })
        }
    })
}

getContactById = async (req, res) => {
    await Contact.findOne({ _id: req.params.id }, (err, contact) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!contact) {
            return res
                .status(404).json({ success: false, error: `Contact not found` })
        }
        return res.status(200).json({ success: true, data: contact })
    }).catch(err => console.log(err))
}

getContacts = async (req, res) => {
    await Contact.find({}, (err, contacts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!contacts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Contacts not found` })
        }
        return res.status(200).json({ success: true, data: contacts})
    }).catch(err => console.log(err))
}

module.exports = {
    createContact,
    updateContact,
    deleteContact,
    getContacts,
    getContactById
}
