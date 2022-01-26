/** A function to check if a user is authenticated or not */
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    next(new Error('User not logged in'))
  }
}

module.exports = checkAuthenticated
