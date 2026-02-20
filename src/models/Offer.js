const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    headline: {
        type: String,
        trim: true
    },
    subline: {
        type: String,
        trim: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Offer', offerSchema);
