const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/nameAse', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId }).lean().sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => { console.log(error) })
})

router.get('/nameDesc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId }).lean().sort({ name: 'desc' })
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

router.get('/category', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId }).lean().sort({ category: 'desc' })
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

router.get('/location', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId }).lean().sort({ location: 'desc' })
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

module.exports = router