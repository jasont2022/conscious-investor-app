const mongoose = require('mongoose')
const { Schema, model } = mongoose

const category = new Schema({ 'Item Code': String, 'Hierarchy of Data Points': String,
  'Title of Data Point': String, 'Data Type': String, Description:String,'Current Status in Asset4': String, S: String, Index: Number}, 
{ collection : 'category_to_description' });

module.exports = model('category', category)
