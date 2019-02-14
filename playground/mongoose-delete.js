const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todos');
const { user } = require('../server/models/user');
const {ObjectID} = require('mongodb');
/**
 * remove the docs from db
 * you have to pass object to remove
 * you can pass empty object to remove to remove all objects
 */

 //delete all records
Todo.deleteMany({}).then((docs)=>{
    console.log('deleteMany Result: ',docs);
});

//delete one record with given query criteria
Todo.deleteOne({text:"Learn Python"}).then((docs) => {
    console.log('deleteOne Result: ', docs);
});

//find and delete the record using id
Todo.findByIdAndDelete('5c652359ac5fcd29358eb784').then((docs) => {
    console.log(' findByIdAndDelete Result: ', docs);
});

//find and delete one record with given query criteria
Todo.findOneAndDelete({text:"Learn Angular"}).then((docs) => {
    console.log('findOneAndDelete Result: ', docs);
});