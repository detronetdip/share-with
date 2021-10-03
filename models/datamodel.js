const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  password: String,
},{timestamps:true});
const collection = new mongoose.model("user", schema);
module.exports = collection;
