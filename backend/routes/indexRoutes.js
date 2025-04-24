const express = require('express')
const adminRoutes = require('./adminRoutes')

const router = express.Router()

//middleware
router.get('/', (req, res) => {
    res.send('Welcome to ReadRite');
})

//admin routers
router.use('/admin', adminRoutes)


//book routers
router.use('/book', require('./bookRoutes'))


//user routers
router.use('/user', require('./userRoutes'))


//rate routers
router.use('/rate', require('./rateRoutes'))

module.exports = router;