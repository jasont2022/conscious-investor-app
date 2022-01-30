const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ticker = new Schema({ 'orgid': Number, 'orgname': String,
  'cusip': String, 'symbol': String}, 
{ collection : 'complete_company' });

module.exports = model('ticker', ticker)