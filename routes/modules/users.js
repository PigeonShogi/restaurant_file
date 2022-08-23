const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  return User.findOne({ email })
    .then((user) => {
      if (!user || user.password !== password) {
        console.log('帳號或密碼錯誤')
      } res.redirect('/')
    })
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  return User.create({ name, email, password })
    .then(() => res.redirect('/users/login'))
})

module.exports = router