const express = require('express')
const router = express.Router()


router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add', (req, res) => {
  res.redirect('/')
})

module.exports = router