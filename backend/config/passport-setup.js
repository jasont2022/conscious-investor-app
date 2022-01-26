/** Import Packages */
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

/** Import the User Model */
const User = require('../models/user')

/** Initialize Passport and Authenticate User */
const initialize = passport => {
  const authenticateUser = (email, password, done) => {
    User.findOne({ email }, async (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        }
        return done(null, false)
      } catch (e) {
        return done(e)
      }
    })
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

  /** Serialize the User  */
  passport.serializeUser((user, done) => done(null, user.id))

  /** Deserialize the User */
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

/** Export the Initialize Method */
module.exports = initialize
