const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const restaurantsJSON = require('../default_data/restaurant.json').results
const SEED_USER = require('../default_data/seed_user')

function createSeed(seedArray, arrayIndex, seedJson) {
  const start = seedArray[arrayIndex].start
  const end = seedArray[arrayIndex].end
  const targetRestaurant = seedJson.slice(start, end)
  db.once('open', () => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedArray[arrayIndex].password, salt))
      .then(hash => User.create({
        email: seedArray[arrayIndex].email,
        password: hash
      }))
      .then(newUser => {
        const userId = newUser._id
        return Promise.all(Array.from(
          targetRestaurant,
          value => {
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
          }
        ))
      })
      .then(() => {
        console.log('Restaurant Seeder Done!')
      })
  })
}

createSeed(SEED_USER, 0, restaurantsJSON)
createSeed(SEED_USER, 1, restaurantsJSON)