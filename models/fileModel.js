const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  size:Number,
  path:String,
  token:String
},{timestamps:true});
const collection = new mongoose.model("files", schema);
module.exports = collection;