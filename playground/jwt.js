const jwt = require('jsonwebtoken');

let data = { id: 4 };
let token = jwt.sign(data,'secret');
console.log('token',token);

let decoded = jwt.verify(token,'secret');
console.log(decoded);