const mongoose = require('mongoose')
const { Schema, model } = mongoose

const company = new Schema({ 'orgid': Number, 'orgname': String,
  'tick': String, 'Data Type': String, cusip : Number}, 
{ collection : 'company_has_orgs' });

module.exports = model('company', company)
