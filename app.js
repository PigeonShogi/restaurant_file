const express = require('express')

const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT || 3000

require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// 設定 express 靜態檔資料夾，否則 handlebars 無法擷取 DOM 元件（學期2-3 U37 套用 Bootstrap）
app.use(express.static('public'))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  // console.log('req.user === ', req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`app.js is running on http://localhost:${port}`)
})