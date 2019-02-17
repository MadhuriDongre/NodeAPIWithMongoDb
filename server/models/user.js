const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      // validator : (value) =>{
      //   return validator.isEmail(value);
      // },
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

/**
 * override a method
 */
UserSchema.methods.toJSON= function(){
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id','email']);
};

/**
 * use static ---works as methods and turn into model method
 * use model as this binding
 */
UserSchema.statics.findByToken=function(token){
  let User = this;
  let decoded;

  try{
    decoded = jwt.verify(token,'123abc');

  }catch(e){
    return new Promise((resolve, reject)=>{
      reject();
    });
    // return new Promise.reject(e);
  }
  return User.findOne({
    _id:decoded._id,
    'tokens.token':token,
    'tokens.access': 'auth'
  });
};

/**
 * Instance method
 */
UserSchema.methods.generateAuthToken = function(){
  let user = this;
  let access ='auth';
  let token = jwt.sign({_id: user._id.toHexString(), access},'123abc').toString();

  user.tokens.push({access,token});
  //user.tokens = user.tokens.concat{[{access,token}]};

  return user.save().then(()=>{
    return token;
  });
}

/**
 * creates user Model in db
 */
let User = mongoose.model("user", UserSchema );
module.exports ={User};