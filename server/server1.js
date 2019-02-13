const mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //use built-in Promise , tell which Promise libary to use in mongoose

//connect to the mongoDb
mongoose.connect('mongodb://localhost:27017/ToDoApp').then(()=>{
    mongoose.disconnect();
}).catch((err)=>{
    console.log('Unable to connect to mongoDb',err);
}); 

/**
 * create module
 */
var Todo = mongoose.model('Todo',{
 text:{
     type:String,
     required: true
 },
 completed:{
     type:Boolean,
     default: false
 },
 completedAt: {
     type:Date,
     default:null
 }
});

/** 
 * create new instance of module.
 * can assign value to object
 */
var newTodo = new Todo({
    text:" learn Java OOPS concepts"
});

//this save the data to mongodb and return 
newTodo.save().then((result)=>{
    console.log('Data saved successfully', JSON.stringify(result,undefined,2));
},(err)=>{
    console.log('Unable to save data', err);
});

var user = mongoose.model('user',{
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        minlength:1
    },
    password:{
        type: String,
        default: null
    }
});

var newUser = new user({
    name:"Madhuri",
    email: "     madhuri@email.com   "
});

newUser.save().then((result)=>{
    console.log('User saved successfully',JSON.stringify(result,undefined,2));
}).catch((err)=>{
    console.log('Unable to save User', err);
});