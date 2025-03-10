const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rateSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Rate', rateSchema);