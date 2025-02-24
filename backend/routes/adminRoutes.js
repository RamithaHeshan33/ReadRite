const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

//admin routers
router.get('/admin', adminController.getAllAdmins)
router.post('/admin/register', adminController.registerAdmin)
router.post('/admin/login', adminController.loginAdmin)

module.exports = router;