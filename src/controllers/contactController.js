const Contact = require('../models/Contact');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private/Admin
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Success',
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};


exports.createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({
            message: 'Contact submission received',
            data: contact
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                message: 'Validation Error',
                error: messages
            });
        }
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};


exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        await Contact.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Contact deleted',
            id: req.params.id
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};
