const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

//book routers
router.get('/', bookController.getAllBooks)
router.get('/:id', bookController.getBookByID)
router.post('/', bookController.addBook)
router.put('/:id', bookController.updateBook)
router.delete('/:id', bookController.deleteBook)


module.exports = router;