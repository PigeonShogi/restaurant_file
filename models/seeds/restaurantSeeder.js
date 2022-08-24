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
const SEED_RESTAURANT = {
  id: 1,
  name: "Sababa 沙巴巴中東美食",
  name_en: "Sababa Pita Bar",
  category: "中東料理",
  image: "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg",
  location: "台北市羅斯福路三段 283 巷 17 號",
  phone: "02 2363 8009",
  google_map: "https://goo.gl/maps/BJdmLuVdDbw",
  rating: 4.1,
  description: "沙巴巴批塔是台灣第一家純手工批塔專賣店,只選用最新鮮的頂級原料,以及道地的中東家傳配方。"
}

db.once('open', () => {
  return User.create({
    email: SEED_USER.email,
    password: SEED_USER.password
  })
    // .then(() => {
    //   return Promise.all(Array.from(
    //     restaurantsJSON,
    //     (value) => {
    //       Restaurant.create({
    //         id: value.id,
    //         name: value.name,
    //         name_en: value.name_en,
    //         category: value.category,
    //         image: value.image,
    //         location: value.location,
    //         phone: value.phone,
    //         google_map: value.google_map,
    //         rating: value.rating,
    //         description: value.description,
    //         // userId
    //       })
    //     }))
    .then(() => {
      return Restaurant.create({
        id: SEED_RESTAURANT.id,
        name: SEED_RESTAURANT.name,
        name_en: SEED_RESTAURANT.name_en,
        category: SEED_RESTAURANT.category,
        image: SEED_RESTAURANT.image,
        location: SEED_RESTAURANT.location,
        phone: SEED_RESTAURANT.phone,
        google_map: SEED_RESTAURANT.google_map,
        rating: SEED_RESTAURANT.rating,
        description: SEED_RESTAURANT.description,
      })
    })
    .then(() => {
      console.log('Restaurant Seeder Done!')
      process.exit()
    })
})