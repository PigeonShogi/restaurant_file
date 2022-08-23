const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 設定 express 靜態檔資料夾，否則 handlebars 無法擷取 DOM 元件（學期2-3 U37 套用 Bootstrap）
app.use(express.static('public'))

app.use(routes)

app.listen(port, () => {
  console.log(`app.js is running on http://localhost:${port}`)
})