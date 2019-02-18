const mongoose=require('mongoose');

/**
 * create Todo module
 */
let Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true
  }, 
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  _creator:{
    type: mongoose.Schema.Types.ObjectId,
    require: true
  }
});

module.exports ={Todo};
