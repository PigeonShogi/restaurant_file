const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./modules/users')

const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/sort', sort)
router.use('/', home)
router.use('/', authenticator, home)

module.exports = router