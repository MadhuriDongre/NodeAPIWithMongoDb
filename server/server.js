const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {user} = require('./models/user');

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
        res.send(err);
    });
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

module.exports ={
    app
}