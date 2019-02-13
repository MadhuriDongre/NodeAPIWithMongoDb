// const MongoClient = require('mongodb').MongoClient;
// //destucturing of object in ES6
// var user ={ name: "Madhuri", age :25};
// var {name}= user; //extracts name property value from user object

const {MongoClient, ObjectID} = require("mongodb");
var obj = new ObjectID(); //new instance of ObjectID
console.log(obj);

MongoClient.connect( 'mongodb://localhost:27017/ToDoApp',(err,client)=>{
    if(err){
        return console.log('Unable to Coonect to MongoDB server');
    }
    console.log('connected to mongoDB server');
    const dbObject = client.db('ToDoApp');
    // dbObject.collection('Todos').insertOne({
    //     text:"Something to do",
    //     completed: false
    // },(err,res)=>{
    //     if(err){
    //         return console.log('Unable to insert',err);
    //     }
    //     console.log('Inserted data successfully',JSON.stringify(res.ops,undefined,2));
    // });

    // dbObject.collection('Users').insertOne({
    //     name:"Madhuri",
    //     age:26,
    //     location: "Bangalore, IN"
    // },(err,res)=>{
    //     if(err){
    //         return console.log('Unable to insert',err);
    //     }
    //     console.log('Inserted data successfully',JSON.stringify(res.ops,undefined,2));
    //     console.log(res.ops[0]._id.getTimestamp());
    // });

    client.close();
});