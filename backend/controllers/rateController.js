const mongoose = require('mongoose');
const RateModel = require('../models/rateModel');

const getAllRates = async(req, res) => {
    let rate;
    try {
        rate = await RateModel.find();
    }

    catch(err) {
        console.log(err);
    }

    if(!rate || rate.length === 0) {
        return res.status(404).json({
            message: 'No rates found'
        });
    }
    return res.status(200).json(rate);
}

exports.getAllRates = getAllRates;


const rateBook = async(req, res) => {
    const {bookId, userId, comment} = req.body;

    if(!mongoose.Types.ObjectId.isValid(bookId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: 'Invalid bookId or userId'
        });
    }

    try {
        const rate = new RateModel({ bookId, userId, comment });
        await rate.save();
        return res.status(201).json(rate);
    }

    catch(err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }


}

exports.rateBook = rateBook;


const getRateByBookID = async (req, res) => {
    const { bookId } = req.params;

    try {
        const rates = await RateModel.find({ bookId }).populate("userId", "name");

        if (!rates || rates.length === 0) {
            return res.status(404).json({
                message: "No ratings found for this book"
            });
        }

        return res.status(200).json(rates);
    } catch (err) {
        console.error("Error fetching ratings:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

exports.getRateByBookID = getRateByBookID;



const getRateByUserID = async(req, res) => {
    const {userId} = req.params;

    let rate;
    try {
        rate = await RateModel.find({userId});
    }

    catch(err) {
        console.log(err);
    }

    if(!rate) {
        return res.status(404).json({
            message: 'No rates found'
        });
    }
    return res.status(200).json(rate);
}

exports.getRateByUserID = getRateByUserID;