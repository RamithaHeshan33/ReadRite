const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

// user routes
router.get('/', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
