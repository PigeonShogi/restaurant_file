const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({
    name, name_en, category, image, location, phone, google_map, rating, description
  })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('add', ({ name, name_en, category, image, location, phone, google_map, rating, description }))
    })
})

module.exports = router