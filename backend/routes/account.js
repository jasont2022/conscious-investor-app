/** Import Packages */
const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
var XMLHttpRequest = require('xhr2');
const axios = require('axios')

/** Import User Model and Middleware */
const User = require('../models/user')
const Category = require('../models/category')
const Company = require('../models/company')
const Esg = require('../models/esg')
const Ticker = require('../models/ticker')
const Comps = require('../models/comps')
const checkAuthenticated = require('../middlewares/isAuthenticated');
const { deserializeUser } = require('passport');

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
router.delete('/remove-account', checkAuthenticated, (req, res) => {
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

// get portfolio information

router.get('/portfolio', (req, res) => {

  if (!req.user) {
    res.send('user not logged in')
  } else {
    const { username, firstname, lastname, portfolio } = req.user
  console.log("Portfolio Info")
  console.log(portfolio)
  res.send(portfolio);
  }
  });




// get preference category names and desciptions
router.get('/categories', (req, res) => {
  console.log("Category")
  console.log("It is printt")
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
router.get('/esg/:tick', async (req, res) => {
  const { params: { tick } } = req
  try {
    const { orgid } = await Company.findOne({ tick: tick})
    const data = await Esg.findOne({ orgid: orgid })
    res.send(data)
  } catch (err) {
    next(err)
  }
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
        res.json({
          tick, 
          score: totalScore
        });
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

//Company Profile
router.get('/company/profile/:tick', (req, res) => {
  var tick = req.params.tick
  axios.get(`https://financialmodelingprep.com/api/v3/profile/${tick}?apikey=e605026ed16aae3b084c6297f09bba6c`).then(result => {
    res.send(result.data)
  })
})

//Company Financials
router.get('/company/financials/:tick/:esg', (req, res) => {
  try {
    var start = new Date().getTime();
    for (var i = 0; i < 1e6; i++) {
      if ((new Date().getTime() - start) > Math.random() * 10000){
        break;
      }
    }
    var tick = req.params.tick
    var esg = req.params.esg
    axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${tick}&token=c80soqqad3ie5egte6d0`).then(comp => {
      var market_value = (comp.data.marketCapitalization)
      axios.get(`http://financialmodelingprep.com/api/v3/ratios-ttm/${tick}?apikey=e605026ed16aae3b084c6297f09bba6c`).then(fin => {
        try {
          var priceEarningsRatio = fin.data[0].priceEarningsRatioTTM
          var priceToBookRatio = fin.data[0].priceToBookRatioTTM
        } catch (err){
          console.log(tick)
        }

        const MV_coef = -1.914
        const VAR_coef = -0.528
        const CP_coef = 0.059
        const BP_coef = -0.018
        const ESG_coef = -0.747

        axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${tick}?apikey=e605026ed16aae3b084c6297f09bba6c&timeseries=10`).then(allHist => {
          arr = []
          allHist.data.historical.forEach(single => {
            arr.push(single.close)
          })
      
          const sum = arr.reduce((acc, val) => acc + val);
          const { length: num } = arr;
          const median = sum / num;
          let variance = 0;
          arr.forEach(num => {
              variance += ((num - median) * (num - median));
          });
          variance /= num;


          var excess_return = Math.abs(MV_coef*market_value
            + CP_coef*priceEarningsRatio + VAR_coef*variance + BP_coef*priceToBookRatio + ESG_coef*Number(esg))

          res.send({
            tick: tick,
            market_value: market_value,
            variance: variance,
            priceEarningsRatio : priceEarningsRatio,
            priceToBookRatio : priceToBookRatio,
            excess_return: excess_return
          })
        })
      })
    })
  } catch (err){
    console.log(err)
  }
})

//News Feed API
router.get('/company/news/:name', (req, res) => {
  var name = req.params.name
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  var total = `${oneWeekAgo.getFullYear()}-${(oneWeekAgo.getMonth() + 1) < 10 ? "0" + (oneWeekAgo.getMonth() + 1) : (oneWeekAgo.getMonth() + 1)}-${(oneWeekAgo.getDate() + 1) < 10 ? "0" + (oneWeekAgo.getDate() + 1) : (oneWeekAgo.getDate() + 1)}`
  axios.get(`https://newsapi.org/v2/everything?q=${name}&from=${total}&sortBy=popularity&apiKey=45bcdb0400ae42528a19416ef87bef5d`).then(result => {
    res.send(result.data)
  })
})


//Your top 10 stocks according to ESG, with industry filter
router.get('/recommendations/top/:industry/:dividend/:rows', (req, res) => {
  var total = []
  var totalDictPart2 = {}
  var industry = req.params.industry
  var dividend = req.params.dividend
  var rows = req.params.rows

  if (!req.user) {
    res.send('user not logged in')
    return
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
          const div = parseFloat(company.get("Dividend yield"));
          if (dividend == "true" && div > 0) {
            total.push(company.Symbol)
          } else if (dividend == "false") {
            total.push(company.Symbol)
          }
        }
      }
    })
  }).then(function () {
    Ticker.find({symbol : {$in : total}}).then(function(allComps) {
      var totalOrgDictionary = {}
      allComps.forEach(function(compJSON) {
        totalOrgDictionary[compJSON["orgid"]] = compJSON["symbol"]
      })
      var allOrgIDs = (Object.keys(totalOrgDictionary))
      Esg.find({orgid : {$in : allOrgIDs}}).then(function(esgInfo) {
        esgInfo.forEach(function(singleESG){
          var totalScore = 
            Number(singleESG["cg_bd_bf"]) * Number(normalized[0])
          + Number(singleESG["cg_bd_bs"]) * Number(normalized[1])
          + Number(singleESG["cg_bd_cp"]) * Number(normalized[2])
          + Number(singleESG["cg_in_vs"]) * Number(normalized[3])
          + Number(singleESG["cg_sh_sr"]) * Number(normalized[4])
          + Number(singleESG["ec_ma_pe"]) * Number(normalized[5])
          + Number(singleESG["ec_pr_sl"]) * Number(normalized[6])
          + Number(singleESG["ec_re_cl"]) * Number(normalized[7])
          + Number(singleESG["en_en_er"]) * Number(normalized[8])
          + Number(singleESG["en_en_pi"]) * Number(normalized[9])
          + Number(singleESG["en_en_rr"]) * Number(normalized[10])
          + Number(singleESG["so_cu_pr"]) * Number(normalized[11])
          + Number(singleESG["so_so_co"]) * Number(normalized[12])
          + Number(singleESG["so_so_hr"]) * Number(normalized[13])
          + Number(singleESG["so_wo_do"]) * Number(normalized[14])
          + Number(singleESG["so_wo_eq"]) * Number(normalized[15])
          + Number(singleESG["so_wo_hs"]) * Number(normalized[16])
          + Number(singleESG["so_wo_td"]) * Number(normalized[17])
          totalDictPart2[totalOrgDictionary[singleESG["orgid"]]] = totalScore;
        })

        // Create items array
        var items = Object.keys(totalDictPart2).map(function(key) {
          return [key, totalDictPart2[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        try {
          // Create a new array with only the first 10 items
          res.send(items.slice(0, rows));
        } catch (e){
          console.log(e)
        }
      })
    })
  })
})


//Your top 10 stocks according to ESG, with industry filter
router.get('/recommendations/model/:industry/:dividend', (req, res) => {
  var industry = req.params.industry
  var dividend = req.params.dividend
  var total = []
  var totalDictPart2 = {}

  if (!req.user) {
    res.send('user not logged in')
    return
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
          const div = parseFloat(company.get("Dividend yield"));
          if (dividend == "true" && div > 0) {
            total.push(company.Symbol)
          } else if (dividend == "false") {
            total.push(company.Symbol)
          }
        }
      }
    })
  }).then(function () {
    Ticker.find({symbol : {$in : total}}).then(function(allComps) {
      var totalOrgDictionary = {}
      allComps.forEach(function(compJSON) {
        totalOrgDictionary[compJSON["orgid"]] = compJSON["symbol"]
      })
      var allOrgIDs = (Object.keys(totalOrgDictionary))
      Esg.find({orgid : {$in : allOrgIDs}}).then(function(esgInfo) {
        esgInfo.forEach(function(singleESG){
          var totalScore = 
            Number(singleESG["cg_bd_bf"]) * Number(normalized[0])
          + Number(singleESG["cg_bd_bs"]) * Number(normalized[1])
          + Number(singleESG["cg_bd_cp"]) * Number(normalized[2])
          + Number(singleESG["cg_in_vs"]) * Number(normalized[3])
          + Number(singleESG["cg_sh_sr"]) * Number(normalized[4])
          + Number(singleESG["ec_ma_pe"]) * Number(normalized[5])
          + Number(singleESG["ec_pr_sl"]) * Number(normalized[6])
          + Number(singleESG["ec_re_cl"]) * Number(normalized[7])
          + Number(singleESG["en_en_er"]) * Number(normalized[8])
          + Number(singleESG["en_en_pi"]) * Number(normalized[9])
          + Number(singleESG["en_en_rr"]) * Number(normalized[10])
          + Number(singleESG["so_cu_pr"]) * Number(normalized[11])
          + Number(singleESG["so_so_co"]) * Number(normalized[12])
          + Number(singleESG["so_so_hr"]) * Number(normalized[13])
          + Number(singleESG["so_wo_do"]) * Number(normalized[14])
          + Number(singleESG["so_wo_eq"]) * Number(normalized[15])
          + Number(singleESG["so_wo_hs"]) * Number(normalized[16])
          + Number(singleESG["so_wo_td"]) * Number(normalized[17])
          totalDictPart2[totalOrgDictionary[singleESG["orgid"]]] = totalScore;
        })
         // Create items array
         var items = Object.keys(totalDictPart2).map(function(key) {
          return [key, totalDictPart2[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        var totalToReturn = []

        items = items.slice(0, 2)

        items.forEach(company_to_check => {
          axios.get(`http://localhost:8080/account/company/financials/${company_to_check[0]}/${company_to_check[1]}`).then(financials => {
            console.log(financials.data)
            totalToReturn.push({
              tick : company_to_check[0],
              esg : company_to_check[1],
              cumulative_excess : excess_return
            })
          })
        })
        while (totalToReturn.length != items.length)
        console.log(totalToReturn)
      })
    })
  })
})


module.exports = router
