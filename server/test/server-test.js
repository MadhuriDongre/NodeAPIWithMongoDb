const expect= require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todos');

//this runs before each test and remove all data from db
beforeEach((done)=>{
 Todo.remove({}).then(()=>done());
});

describe('/Post todos',()=>{
    it('should create a new todo',(done)=>{
        let text ="test todo text";
        request(app)
          .post("/todos")
          .send({ text })
          .expect(200)
          .expect((res)=>{
              expect(res.body.text).toEqual(text)
            })
          .end((err,res)=>{
            if(err){
                return done(err);
            }
            /**
             * test the database
             */
            Todo.find().then((todos)=>{
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
                    expect(todos.length).toBe(0);
                    done();
                })
                .catch(err => done());
          });
    });
});