require('../config/config');

const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {user} = require('./models/user');
const { ObjectID } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
/**
 * created middleware to JSON parse the body of response using body-parser
 */
app.use(bodyParser.json());

/**
 * Post method to call todos
 */
app.post('/todos',(req,res)=>{
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((response)=>{
        console.log('Successfully posted todo item');
        console.log(JSON.stringify(response,undefined,2));
        res.send(response);
    },(err)=>{
        console.log('Unable to Post todo Item', JSON.stringify(err,undefined,2));
        res.status(400).send(err);
    });
});

/**
 * Get method to get all todos items
 */
app.get("/todos", (req, res) => {
    Todo.find().then((response)=>{
        res.send(response);
    },(err)=>{
        res.status(400).send(err);
    });
});
/**
 * get todo item using id passed as param
 */
app.get("/todos/:id",(req,res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid Id');
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            res.status(404).send(`No todo item for id: ${id}`);
        }
        res.send(todo);
    }).catch(err=>res.status(400).send());
});

/**
 * delete todo items using id
 */
app.delete('/todos/:id',(req,res)=>{
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }
    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            res.status(404).send(`No todo item found for id: ${id}`);
        }
        res.send(todo);
    }).catch(err => res.status(400).send());
});

/**
 * update route to update the todolist
 */
app.patch('/todos/:id',(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body,['text','completed']); //picks the properties from res.body if present
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }
    //checks if completed property is boolean
    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false,
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, { $set: body },{new: true}).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.send(todo);

    }).catch(e=>res.status(400).send());
});


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

module.exports ={
    app
}