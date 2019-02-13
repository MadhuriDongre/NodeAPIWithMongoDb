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
     //query all documents,  find() returns cursor, toArray gets the documents and return Promise
    dbObject.collection('Todos').find().toArray().then((docs)=>{
        console.log('Todos list');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err)=>{
        console.log('Unable ti fetch Todos list',JSON.stringify(err,undefined,2));
    });
    
    /**
     * Query with condition 
     */
    dbObject.collection('Todos').find({completed:false}).toArray().then((docs)=>{
        console.log('Pending Todos list');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err)=>{
        console.log('Unable to fetch Todos list',JSON.stringify(err,undefined,2));
    }); 

    /**
     * Query with ID 
     */
    dbObject.collection('Todos').find({_id:new ObjectID('5c63bd93f7fcebc07f431b5b')}).toArray().then((docs)=>{
        console.log('Todos list with Id');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err)=>{
        console.log('Unable ti fetch Todos list',JSON.stringify(err,undefined,2));
    });

    /**
     * Query with count
     */
    dbObject.collection('Todos').find().count().then((count)=>{
        console.log(`Todos list count: ${count}`);
    }, (err)=>{
        console.log('Unable ti fetch Todos list',JSON.stringify(err,undefined,2));
    });

    /**
     * Query users collection with name
     */
    dbObject.collection('Users').find({name:'Madhuri'}).toArray().then((docs)=>{
        console.log('User list with name');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err)=>{
        console.log('Unable ti fetch Todos list',JSON.stringify(err,undefined,2));
    });

    client.close();
});