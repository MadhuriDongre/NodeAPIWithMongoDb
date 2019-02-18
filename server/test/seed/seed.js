const { Todo } = require('../../models/todos');
const { User } = require('../../models/user');
const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const todos = [
    {
        _id: new ObjectID(),
        text: "Learn Java"
    },
    {
        _id: new ObjectID(),
        text: "Learn Python",
        completed: true,
        completedAt: 123456
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
        done();
    });
};

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users =[{
    _id: userOneId,
    email:'madhu@email.com',
    password: 'userOnePass',
    tokens:[{
        access:'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth'},'123abc').toString()}]
    },
    {
    _id: userTwoId,
    email:'madhuri@email.com',
    password: 'userTwoPas'
}];

const populateUsers = (done) => {
    User.deleteMany().then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        return Promise.all([userOne,userTwo]);
    }).then(()=>done());

};

module.exports={
    populateTodos,
    todos,
    populateUsers,
    users
}