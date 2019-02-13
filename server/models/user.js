const mongoose = require('mongoose');

/**
 * creates user Model in db
 */
let user = mongoose.model("user", {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    default: null
  }
});
module.exports ={user};