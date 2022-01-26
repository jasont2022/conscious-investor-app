/** Import Packages */
const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')

/** Import User Model and Middleware */
const User = require('../models/user')
const checkAuthenticated = require('../middlewares/isAuthenticated')

/** Make a router */
const router = express.Router()

/** All routes with account */

router.get('/user', (req, res) => {
  if (!req.user) {
    res.send('user not logged in')
  } else {
    const { username } = req.user
    res.json({ username })
  }
})

router.post('/signup', async (req, res, next) => {
  const {
    username, password, email, firstname, lastname,
  } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({
      username, password: hashedPassword, email, firstname, lastname,
    })
    res.send('this user is created successfully')
  } catch (err) {
    next(err)
  }
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureFlash: true,
}))

router.post('/logout', checkAuthenticated, (req, res) => {
  req.logout()
  res.send('user logged out sucessfully')
})

module.exports = router
