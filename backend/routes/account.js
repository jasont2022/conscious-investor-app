/** Import Packages */
const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
var XMLHttpRequest = require('xhr2');

/** Import User Model and Middleware */
const User = require('../models/user')
const Category = require('../models/category')
const Company = require('../models/company')
const Esg = require('../models/esg')
const Ticker = require('../models/ticker')
const Comps = require('../models/comps')
const checkAuthenticated = require('../middlewares/isAuthenticated')

/** Make a router */
const router = express.Router()

/** All routes with account */

router.get('/user', (req, res) => {
  if (!req.user) {
    res.send('user not logged in')
  } else {
    const { username, firstname, lastname, portfolio, preferences } = req.user
    res.json({ username, firstname, lastname, portfolio, preferences })
  }
})

router.post('/signup', async (req, res, next) => {
  const {
    username, password, email, firstname, lastname,
  } = req.body

  console.log(req.body)

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
  failureFlash: true
}))

router.post('/logout', checkAuthenticated, (req, res) => {
  req.logout()
  res.send('user logged out sucessfully')
})

// //add delete for user, post or delete

// router.post('/delete', checkAuthenticated, (req, res) => {
//   //delete logic

//   //in postman, localhost:8080/account/delete
// }

// //post change weight for category for specific preference

//

// delete account by username
router.delete('/remove-account', (req, res) => {
  if (!req.user) {
    res.send('user not logged in')
  } else {
    const { username, firstname, lastname, portfolio, preferences } = req.user
    res.json({ username, firstname, lastname, portfolio, preferences })

    User.find({ username: username }).remove( ()=> console.log("Done") )
  }
})


// add stock to portfolio using ticker
router.post('/add-portfolio/:tick', (req, res) => {
  if (!req.user) {
    res.send('user not logged in')
  } else {
    const { username, firstname, lastname, portfolio, preferences } = req.user
    var ticker = req.params.tick;
    if (portfolio.indexOf(ticker) !== -1 ) {
      res.send('Already Added Ticker to User Portfolio')
    } else {
      User.findOneAndUpdate(
        { username: username }, 
        { $push: { portfolio: ticker  } },
        function (error, success) {
          if (error) {
            // console.log(error)
            res.send('Could not add ticker')
          } else {
            // console.log(success)
            res.send('Added ticker sucessfully')
          }
      });
    }
  }
})

// remove stock from portfolio using ticker
router.post('/remove-portfolio/:tick', (req, res) => {
  if (!req.user) {
    res.send('user not logged in')
  } else {
    const { username, firstname, lastname, portfolio, preferences } = req.user
    var ticker = req.params.tick;
    if (portfolio.indexOf(ticker) === -1 ) {
      res.send('Ticker not in Portfolio')
    } else {
      User.findOneAndUpdate(
        { username: username }, 
        { $pull: { portfolio: ticker  } },
        function (error, success) {
          if (error) {
            // console.log(error)
            res.send('Could not remove ticker')
          } else {
            // console.log(success)
            res.send('Removed ticker sucessfully')
          }
      });
    }
  }
})

// get preference category names and desciptions
router.get('/categories', (req, res) => {
  console.log("Category")
  Category.find({}).then(function (cat) {
    res.send(cat);
  });
})

// get preference category names and desciptions from Index
router.get('/categories/:index', (req, res) => {
  const index = req.params.index
  Category.findOne({Index: Number(index) }).then(function (category) {
    res.send(category);
  });
})

// adjust user weights
router.post('/preferences', (req, res) => {
  const preferenceList = req.body.preferencesList
  console.log(preferenceList)
  if (!req.user) {
    res.send('user not logged in')
  } else {
    const { username, firstname, lastname, portfolio, preferences } = req.user
    var preferences_new = preferenceList
    User.findOneAndUpdate(
      { username: username }, 
      { $set: { preferences: preferences_new  } },
      function (error, success) {
        if (error) {
          // console.log(error)
          res.send('Could not update preference')
        } else {
          // console.log(success)
          res.send('Updated preference sucessfully')
        }
    });
  }
})

router.get('/company', (req, res) => {
  Company.find({}).then(function (comp) {
    res.send(comp);
  });
})

//get score for company given ticker
router.get('/esg/:tick', (req, res) => {
  const tick = req.params.tick
  Company.findOne({tick : tick}).then(function (comp) {
    res.send(comp);
  });
})

//get score for company given ticker
router.get('/ticker/:tick', (req, res) => {
  if (!req.user) {
    res.send('user not logged in')
  } else {
    const { username, firstname, lastname, portfolio, preferences } = req.user
    const reducer = (accumulator, curr) => accumulator + curr;
    const total_sum_score = preferences.reduce(reducer)
    var normalized = []
    for (var i = 0; i < 18; i++){
      normalized.push(preferences[i]/total_sum_score)
    }
    
    var totalScore = 0
    const tick = req.params.tick
    Ticker.findOne({symbol : tick}).then(function (comp) {
      Esg.findOne({orgid:comp.orgid}).then(function(compp){
        totalScore += 
        Number(compp["cg_bd_bf"]) * Number(normalized[0])
        + Number(compp["cg_bd_bs"]) * Number(normalized[1])
        + Number(compp["cg_bd_cp"]) * Number(normalized[2])
        + Number(compp["cg_in_vs"]) * Number(normalized[3])
        + Number(compp["cg_sh_sr"]) * Number(normalized[4])
        + Number(compp["ec_ma_pe"]) * Number(normalized[5])
        + Number(compp["ec_pr_sl"]) * Number(normalized[6])
        + Number(compp["ec_re_cl"]) * Number(normalized[7])
        + Number(compp["en_en_er"]) * Number(normalized[8])
        + Number(compp["en_en_pi"]) * Number(normalized[9])
        + Number(compp["en_en_rr"]) * Number(normalized[10])
        + Number(compp["so_cu_pr"]) * Number(normalized[11])
        + Number(compp["so_so_co"]) * Number(normalized[12])
        + Number(compp["so_so_hr"]) * Number(normalized[13])
        + Number(compp["so_wo_do"]) * Number(normalized[14])
        + Number(compp["so_wo_eq"]) * Number(normalized[15])
        + Number(compp["so_wo_hs"]) * Number(normalized[16])
        + Number(compp["so_wo_td"]) * Number(normalized[17])
        console.log(totalScore)
        res.send('Personal score for ' + tick + " is " + totalScore);
      })
    });
  }
})

//get score for company given ticker
router.get('/financial/regression/:tick', (req, res) => {
  const tick = req.params.tick
  url = `https://financialmodelingprep.com/api/v3/quote/${tick}?apikey=a4bedca2df6809daa70d74cf9671699f`

  const xhr = new XMLHttpRequest()
  //open a get request with the remote server URL
  xhr.open("GET", url)
  //send the Http request
  xhr.send()

  //EVENT HANDLERS

  //triggered when the response is completed
  xhr.onload = function() {
    if (xhr.status === 200) {
      //parse JSON data
      data = JSON.parse(xhr.responseText)
      res.send(data)
    } else if (xhr.status === 404) {
      console.log("No records found")
    }
  }
})

//get score for company given ticker
router.get('/total-companies', (req, res) => {
  Comps.find({}).then(function (comp) {
    res.send(comp);
  });
})

//Your top 10 stocks according to ESG, with industry filter
router.get('/recommendations/top10/:industry/:dividend', (req, res) => {
  var total = []
  var totalDict = {}
  var industry = req.params.industry
  var dividend = req.params.dividend
  if (!req.user) {
    res.send('user not logged in')
  } else {
    const { username, firstname, lastname, portfolio, preferences } = req.user
    const reducer = (accumulator, curr) => accumulator + curr;
    const total_sum_score = preferences.reduce(reducer)
    var normalized = []
    for (var i = 0; i < 18; i++){
      normalized.push(preferences[i]/total_sum_score)
    }
  }
  Comps.find({}).then(function (comp) {
    comp.forEach((company) => {
      if (industry === "None"){
        total.push(company.Symbol)
      } else {
        if (company["GICS Sector"] == industry){
          total.push(company.Symbol)
        }
      }
    })
  }).then(function (){
    total.forEach( function (symb) {
      var totalScore = 0
      Ticker.findOne({symbol : symb}).then(function (comp) {
        if (comp !== null){
          Esg.findOne({orgid:comp.orgid}).then(function(compp){
            totalScore += 
          Number(compp["cg_bd_bf"]) * Number(normalized[0])
          + Number(compp["cg_bd_bs"]) * Number(normalized[1])
          + Number(compp["cg_bd_cp"]) * Number(normalized[2])
          + Number(compp["cg_in_vs"]) * Number(normalized[3])
          + Number(compp["cg_sh_sr"]) * Number(normalized[4])
          + Number(compp["ec_ma_pe"]) * Number(normalized[5])
          + Number(compp["ec_pr_sl"]) * Number(normalized[6])
          + Number(compp["ec_re_cl"]) * Number(normalized[7])
          + Number(compp["en_en_er"]) * Number(normalized[8])
          + Number(compp["en_en_pi"]) * Number(normalized[9])
          + Number(compp["en_en_rr"]) * Number(normalized[10])
          + Number(compp["so_cu_pr"]) * Number(normalized[11])
          + Number(compp["so_so_co"]) * Number(normalized[12])
          + Number(compp["so_so_hr"]) * Number(normalized[13])
          + Number(compp["so_wo_do"]) * Number(normalized[14])
          + Number(compp["so_wo_eq"]) * Number(normalized[15])
          + Number(compp["so_wo_hs"]) * Number(normalized[16])
          + Number(compp["so_wo_td"]) * Number(normalized[17])
          totalDict[symb] = totalScore
          }).then(function(){
            if (totalDict['MCY'] > 0){
              // Create items array
              var items = Object.keys(totalDict).map(function(key) {
                return [key, totalDict[key]];
              });

              // Sort the array based on the second element
              items.sort(function(first, second) {
                return second[1] - first[1];
              });

              try {
                // Create a new array with only the first 10 items
                res.send(items.slice(0, 10));
              } catch (e){
                console.log(e)
              } 
            }
          })
        }
      })
    })
  })
})

//add industry and top x filter


module.exports = router
