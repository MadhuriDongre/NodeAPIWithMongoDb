var mongoose = require("mongoose");

mongoose.Promise = global.Promise; //use built-in Promise , tell which Promise libary to use in mongoose

/**
 * connect to mongoDb using mongoose
 */
mongoose.connect("mongodb://localhost:27017/ToDoApp");

module.exports = { mongoose };