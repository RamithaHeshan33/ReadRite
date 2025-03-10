const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');

router.get('/', rateController.getAllRates);
router.post('/', rateController.rateBook);
router.get('/book/:bookId', rateController.getRateByBookID);
router.get('/user/:userId', rateController.getRateByUserID);


module.exports = router;