const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    Excerpt: {
        type: String,
        required: [true, 'Please add an excerpt']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    }
});

module.exports = mongoose.model('Blog', blogSchema);
