const mongoose = require('mongoose')
const { Schema, model } = mongoose

const comps = new Schema({ 'Symbol': String, 'Description': String,
  'Category2': String, 'Category3': String, 'GICS Sector' : String,
  'Market Cap' : String, 'Dividend yeild' : String, 'Country' : String}, 
{ collection : '1000_company' });

module.exports = model('comps', comps)