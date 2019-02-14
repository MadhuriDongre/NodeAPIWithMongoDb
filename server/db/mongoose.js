var mongoose = require("mongoose");

mongoose.Promise = global.Promise; //use built-in Promise , tell which Promise libary to use in mongoose

/**
 * connect to mongoDb using mongoose
 */
mongoose.connect(process.env.MONGOLAB_RED_URI);

module.exports = { mongoose };