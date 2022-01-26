/** Import packages */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cors = require('cors')
const passport = require('passport')
const path = require('path')

/** Import Database Credentials */
const {
  ATLAS_ACCOUNT,
  ATLAS_PASSWORD,
  ATLAS_DB_NAME,
  ATLAS_CLUSTER_NAME,
} = require('./secret') // require the credentials for DB connection

/** Import the backend routes */
const AccountRouter = require('./routes/account')
const ProfileRouter = require('./routes/profile')

/** Import Passport Setup Function */
const initializePassport = require('./config/passport-setup')

// connect to the database
const MONGO_URI = `mongodb+srv://${ATLAS_ACCOUNT}:${ATLAS_PASSWORD}@${ATLAS_CLUSTER_NAME}.nxjub.mongodb.net/${ATLAS_DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connnected to MongoDB Database successfully')).catch(e => {
  console.error(`Connection error to MongoDB Database ${e.message}`)
})

/** Create an Express Server */
const port = process.env.PORT || 8080
const app = express()

/** Initialize Passort */
initializePassport(passport)

// connect frontend and backend
app.use(express.static(path.join(__dirname, '../frontend/build')))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/** Create a Cookie Session for User OAuth */
app.use(
  cookieSession({
    name: 'local-session',
    keys: ['jfdfdfrzqndfsdfpqqazf'],
    maxAge: 26 * 60 * 60 * 1000, // 24 hours
  }),
)

/** Create Passport OAuth and Session */
app.use(passport.initialize())
app.use(passport.session())


// test to see if localhost:8080 works
app.get('/', (_, res, next) => {
  try {
    res.send('welcome to ethical investor rest api')
  } catch (err) {
    next(err)
  }
})

/** Define all the backend routes */
app.use('/account', AccountRouter)
app.use('/profile', ProfileRouter)

// connect frontend and backend
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

/** Error handling Route */
app.use((err, _req, res, _next) => {
  console.log(err.stack)
  res.status(500).send(`Ops something went wrong: ${err}`)
})

/** Listening on Port */
app.listen(port, err => {
  if (err) throw err
  console.log(`Server listening to ${port}`)
})
