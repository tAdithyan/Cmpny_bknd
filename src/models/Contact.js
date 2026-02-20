const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    company: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    service: {
        type: String,
        required: [true, 'Please select a service']
    },
    message: {
        type: String,
        required: [true, 'Please add a message']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);
