const expect= require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todos');
const { User } = require('../models/user');
const { ObjectID} = require('mongodb');

//dummy data
const { todos, populateTodos, populateUsers,users} = require('./seed/seed');

//this runs before each test and remove all data from dby

beforeEach((done)=>{
    populateUsers;
    done();
});
beforeEach((done)=>{
    populateTodos;
    done();
});

describe('/Post todos',()=>{
    it('should create a new todo',(done)=>{
        let text ="test todo text";
        request(app)
          .post("/todos")
          .send({text})
          .expect(200)
          .expect((res)=>{
              expect(res.body.text).toEqual(text);
            })
          .end((err,res)=>{
            if(err){
                return done(err);
            }
            /**
             * test the database
             */
            Todo.find({ text: "test todo text"}).then((todos)=>{
                expect(todos.length).toEqual(1);
                expect(todos[0].text).toEqual(text);
                done();
            }).catch(err=>done());
          });
    });

    it('should not create new todo with invalid data',(done)=>{
        request(app)
          .post("/todos")
          .send({})
          .expect(400)
          .expect((err)=>{
              expect(err).toBeTruthy();
          })
          .end((err,res)=>{
              if(err){
                  return done(err);
              }
              Todo.find()
                .then(todos => {
                    expect(todos.length).toBe(2);
                    done();
                })
                .catch(err => done());
          });
    });
});

describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
        request(app).get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo with id param', (done) => {
        let id = todos[0]._id.toHexString();
        request(app).get(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should not return todo with invalid id param', (done) => {
        let id = '12344';
        request(app).get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        let id = new ObjectID().toHexString();
        request(app).get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

});

/**
 * test suite for DELETE route
 */
describe('DELETE /todos/:id', () => {
    it('should delete todo with id param', (done) => {
        let id = todos[0]._id.toHexString();
        request(app).delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(todos[0]._id.toHexString());
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.findById(id).then((res)=>{
                    expect(res).toNotExist();
                    done();
                }).catch(e=>done(e));
            });
    });
    it('should not delete todo with invalid id param', (done) => {
        let id = '12344';
        request(app).delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 if todo not found and deleted', (done) => {
        let id = new ObjectID().toHexString();
        request(app).delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});

/**
 * test suite for PATCH route
 */
describe('PATCH /todos/:id', () => {
    it('should update todo with id param', (done) => {
        let id = todos[0]._id.toHexString();
        request(app).patch(`/todos/${id}`)
            .send({text:"test data 1",completed: true})
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(todos[0]._id.toHexString());
                expect(res.body.text).toEqual("test data 1");
                expect(res.body.completed).toBe(true);
                expect(res.body.completedAt).toNotBe(null);
            })
            .end(done);
    });
    it('should clear completedAt when todo is not completed', (done) => {
        let id = todos[1]._id.toHexString();
        request(app).patch(`/todos/${id}`)
            .send({ text: "test data 2", completed: false })
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(todos[1]._id.toHexString());
                expect(res.body.text).toEqual("test data 2");
                expect(res.body.completed).toBe(false);
                expect(res.body.completedAt).toBe(null).toNotExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(id).then((res) => {
                    expect(res.completed).toBe(false);
                    expect(res.completedAt).toBe(null);
                    done();
                }).catch(e => done(e));
            });
    });
    it('should not update when id is invalid', (done) => {
        let id = '12344';
        request(app).patch(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
    it('should not update when id does not exist in db', (done) => {
        let id = new ObjectID().toHexString();
        request(app).patch(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});

describe('GET /user/me',()=>{
    it('should return user if authenticated',()=>{
        request(app).get(`/user/me`).set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(users[0].email);
                expect(res.body._id).toBe(users[0]._id.toHexString());
            })
            .end(done);
    });

    it('should return 401 if unauthenticated',(done)=>{
        let id = users[0]._id.toHexString();
        request(app).get(`/user/me`)
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);

    });
});

describe('POST /user',()=>{
    it('should create a user',(done)=>{

        let email="madhuri123@in.com";
        let password="abs123";
        request(app).post('/user')
        .send({email,password})
        .expect(200)
        .expect((res)=>{
            expect(res.header['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
        .end((err,response)=>{
            if(err){
                return done(err);
            }
            User.findOne({email}).then((user)=>{
                expect(user).toExist();
                expect(user.password).toBe(password);
                done();
            }).catch(err => done(err));
        });
    });

    it('should return validation error if request is invalid', (done) => {
        request(app).post('/user')
            .send({email:"hgsdhgjsd",password:"335535"})
            .expect(400)
            .end(done);
    });

    it('should not create user if email is in use', (done) => {
        let email = users[0].email;
        let password = "abs123!";
        request(app).post('/user')
            .send({ email, password })
            .expect(400)
            .end(done);
    });
});

describe('POST /user/login',()=>{
    it('should login user and return auth token',(done)=>{
        request(app)
        .post('/user/login')
        .send({
            email: users[1].email,
            password: users[1].password
        })
        .expect(200)
        .expect((res)=>{
            expect(res.header['x-auth']).toExist();
            expect(res.body.email).toBe(users[1].email);
        })
        // .end((err,response)=>{
        //     if(err){
        //        return done(err);
        //     }
        //     User.findById(users[1]._id).then((user)=>{
        //         expect(user.tokens[0]).toInclude({
        //             access:'auth',
        //             token: response.header['x-auth']
        //         });
        //         done();
        //     }).catch(e=>done(e));
        // });
        .end(done);
    });
    it('should reject invalis login',(done)=>{
        request(app)
            .post('/user/login')
            .send({
                email: users[1].email+'query',
                password: users[1].password
            })
            .expect(400)
            .expect((res) => {
                expect(res.header['x-auth']).toNotExist();
            })
            .end(done);
    });
});