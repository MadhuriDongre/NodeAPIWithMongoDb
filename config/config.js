const env = process.env.NODE_ENV || 'development';
console.log("env*****",env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGOLAB_RED_URI = "mongodb://localhost:27017/ToDoApp";
}
else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGOLAB_RED_URI = "mongodb://localhost:27017/ToDoAppTest";
}

