const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')

/*
登入頁面與 Flash message 尚未完成，詳情參考教案－－延伸挑戰：https://lighthouse.alphacamp.co/courses/118/units/25458
*/

module.exports = app => {
  /*
  初始化 Passport 模組
  1. 在 npm 找到 passport 的官方文件  https://www.npmjs.com/package/passport
  2. 搜尋 Middleware
  3. 可知：
     app.use(passport.initialize())
     app.use(passport.session())
     是必要的編碼。
  */
  app.use(passport.initialize())
  app.use(passport.session())
  /*
  設定本地登入策略
  1. 找到官方文件：https://www.passportjs.org/packages/passport-local/
  2. 將官方範例複製並依照需求調整編碼（例如改用箭頭函式、Promise語法等）
  3. Field 的相關說明見 GitHub 官方文件：https://github.com/jaredhanson/passport-local#parameters
  */

  /*
  延伸挑戰：
  app.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function(req, res) {
      res.redirect('/~' + req.user.username);
    });
  */

  passport.use(new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('error_msg', '您輸入的帳號尚未註冊'))
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('error_msg', '密碼有誤，請注意英文大小寫是否正確輸入。'))
            }
            return done(null, user)
          })
        })
        .catch(err => (done(err, false)))
    }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_APP_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }))

  /*
  設定序列化與反序列化
  1. 找到官方文件：https://www.npmjs.com/package/passport
  2. 尋找標題「Sessions」
  3. 找到範例編碼
  */
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}