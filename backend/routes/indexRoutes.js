const express = require('express')
const adminRoutes = require('./adminRoutes')

const router = express.Router()

//admin routers
router.use('/admin', adminRoutes)


//book routers
router.use('/book', require('./bookRoutes'))


//user routers
router.use('/user', require('./userRoutes'))


//rate routers
router.use('/rate', require('./rateRoutes'))

module.exports = router;