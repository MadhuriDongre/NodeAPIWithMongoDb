const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todos');
const { user } = require('../server/models/user');
const {ObjectID} = require('mongodb');

let id = '5c64e77ee70f1e3fb80c861c';

/**
 * validation for id
 */
if(!ObjectID.isValid(id)){
    console.log('Id not valid');
}

/**
 * Query using find
 * find returns array of objects
 */
Todo.find({_id:id}).then((res)=>{
    console.log('todos',res);
});

/**
 * Query using findOne
 * findOne returns onle one object
 */
Todo.findOne({ _id: id }).then((res) => {
    console.log('todo', res);
});

/**
 * Query using findById
 */
Todo.findById(id).then((res) => {
    if(!res){
        return console.log('Unable to find Id');
    }
    console.log('todo by id', res);
}).catch(err=>console.log(err));


/**
 * Query for user using findById
 */
let userId ='6c64257ea641562cbc8cd150'
user.findById(userId).then((res)=>{
    if(!res){
        return console.log('id not found');
    }
    console.log('find user by id', res);
}).catch(err=>console.log(err));