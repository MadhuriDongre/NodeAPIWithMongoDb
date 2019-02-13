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
  }
});

module.exports ={Todo};
