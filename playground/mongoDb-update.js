const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect( 'mongodb://localhost:27017/ToDoApp',(err,client)=>{
    if(err){
        return console.log('Unable to Connect to MongoDB server');
    }
    console.log('connected to mongoDB server');
    const dbObject = client.db('ToDoApp');

    /**
     * update the collection object values ising mongodB $set function
     */
    dbObject.collection('Todos')
    .findOneAndUpdate({_id:new ObjectID("5c63bd93f7fcebc07f431b57")},{ $set:{completed:false}},{returnOriginal:false})
    .then((docs)=>{
        console.log('Updated the Todos list',JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to update Todos list',err);
    });

    /**
     * update the Users collection using mongodb $inc
     */
    dbObject.collection('Users')
    .findOneAndUpdate({name:"Madhu"},{$inc: { age: 1},$set:{name:"Madhuri"}},{returnOriginal:false})
    .then((result)=>{
        console.log('updated name and incremented age',result);
    },(err)=>{
        console.log('unable to update',err);
    });

    client.close();
});