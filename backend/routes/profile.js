/** Import Packages */
const express = require('express')
const bcrypt = require('bcrypt')

/** Import User Model and Middleware */
const User = require('../models/user')
const checkAuthenticated = require('../middlewares/isAuthenticated')

/** Make a router */
const router = express.Router()

/** All routes with profile */

// router.get('/', async (_req, res, next) => {
//   try {
//     const users = await User.find().select('-password')
//     res.send(users)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:username', async (req, res, next) => {
  const { username } = req.params
  try {
    const user = await User.findOne({ username }).select('-password')
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.post('/edit', checkAuthenticated, async (req, res, next) => {
  const {
    password, email, firstname, lastname,
  } = req.body
  const { username } = req.user

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate({ username }, {
      password: hashedPassword, email, firstname, lastname,
    })
    res.send('user was updated')
  } catch (err) {
    next(err)
  }
})

module.exports = router
