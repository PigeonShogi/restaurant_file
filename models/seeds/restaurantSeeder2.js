const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const restaurantsJSON = require('../restaurant.json').results

const SEED_USER = {
  email: 'user1@example.com',
  password: 12345678
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        restaurantsJSON,
        (value) =>
          Restaurant.create({
            id: value.id,
            name: value.name,
            name_en: value.name_en,
            category: value.category,
            image: value.image,
            location: value.location,
            phone: value.phone,
            google_map: value.google_map,
            rating: value.rating,
            description: value.description,
            userId
          })
      ))
    })
    .then(() => {
      console.log('Restaurant Seeder Done!')
      process.exit()
    })
})