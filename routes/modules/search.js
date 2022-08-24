const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('', (req, res) => {
  const { keyword } = req.query
  const userId = req.user._id
  Restaurant.find({ userId }).lean()
    .then(restaurant => {
      const searchedRestaurants = restaurant.filter((element) => {
        return element.name.toLowerCase().includes(keyword.toLowerCase())
          || element.name_en.toLowerCase().includes(keyword.toLowerCase())
          || element.category.toLowerCase().includes(keyword.toLowerCase())
      })

      if (searchedRestaurants.length === 0) {
        res.render('no_result', { keyword })
      } else {
        res.render('index', { restaurants: searchedRestaurants, keyword })
      }
    }
    )
})

module.exports = router