const mongoose = require('mongoose');
// define MONGODB_URI (process.env.MOGNGODB_URI is not defined by default but it allows environmental variables => local developement/cloud hosting)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test"

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB", err));

module.exports = mongoose;