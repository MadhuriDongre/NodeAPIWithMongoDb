const {MongoClient, ObjectID} = require("mongodb");
var obj = new ObjectID(); //new instance of ObjectID
console.log(obj);

MongoClient.connect( 'mongodb://localhost:27017/ToDoApp',(err,client)=>{
    if(err){
        return console.log('Unable to Connect to MongoDB server');
    }
    console.log('connected to mongoDB server');
    const dbObject = client.db('ToDoApp');

    /**
     *delete multiple documents
     */
    dbObject.collection('Todos').deleteMany({text:"todo list 3"}).then((docs)=>{
        console.log('Deleted Todos item');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err)=>{
        console.log('Unable to delete Todos items',JSON.stringify(err,undefined,2));
    });

    //below line works the same way
    //dbObject.collection('Todos').deleteMany({text:"todo list 3"});

    /**
     * delete one record that is encoutered first
     */
    dbObject.collection('Todos').deleteOne({text:'Learn Testing'}).then((result)=>{
        console.log('Deleted one record',JSON.stringify(result,undefined,2));
    },(err)=>{
        console.log(err);
    });

    /**
     * findOne and delete record that is encoutered first
     */
    dbObject.collection('Todos').findOneAndDelete({completed:false}).then((docs)=>{
        console.log('Found and Deleted one record',JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log(err);
    });

    /**
     * Deleted multiple docs in Users collection
     */
    dbObject.collection('Users').deleteMany({name:"Madhuri"}).then((result)=>{
        console.log('deleted many records in User collection',JSON.stringify(result,undefined,2));
    },(err)=>{
        console.log('Unable to delete records',err);
    });

    /**
     * Find and delete record from Users collection using Id
     */
    dbObject.collection('Users').findOneAndDelete({_id: new ObjectID('5c63b78bbb0dce1d78223faa')}).then((docs)=>{
        console.log('Found and deleted one record from Users collection', JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to find or delete record',err);
    });

    client.close();
});