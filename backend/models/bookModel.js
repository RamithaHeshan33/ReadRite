const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    bookPrice: {
        type: Number,
        required: true
    },
    bookImage: {
        type: String,
        required: true
    },
    bookDescription: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Book', bookSchema);