const express = require('express')
const adminRoutes = require('./adminRoutes')

const router = express.Router()

//admin routers
router.use('/admin', adminRoutes)


//book routers
router.use('/book', require('./bookRoutes'))




module.exports = router;