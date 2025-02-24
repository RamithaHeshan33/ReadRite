const express = require('express')
const adminRoutes = require('./adminRoutes')

const router = express.Router()

//admin routers
router.use('/admin', adminRoutes)





module.exports = router;