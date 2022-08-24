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

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ _id: id })
    .lean()
    .then((restaurants) => {
      res.render('show', ({ restaurants, id }))
    })
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ _id: id })
    .lean()
    .then(restaurants => {
      res.render('edit', ({ restaurants }))
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return Restaurant.findOne({ _id: id })
    .then(restaurant => {
      // restaurant.name = name
      // restaurant.name_en = name_en
      // restaurant.category = category
      // restaurant.image = image
      // restaurant.location = location
      // restaurant.phone = phone
      // restaurant.google_map = google_map
      // restaurant.rating = rating
      // restaurant.description = description
      restaurant = Object.assign(restaurant, req.body) // 使用 Object.assign，相當於撰寫以上幾行註解的內容。
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => {
      console.log(error)
      res.render('errorPage', ({ error: error.message }))
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ _id: id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router