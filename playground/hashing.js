const {SHA256} = require('crypto-js');

let message = 'I am user number 3';
let hash = SHA256(message).toString();

console.log('Message: ',message);
console.log('Hash: ',hash);

//adding extra item prevent from data from being manipulated
let data={id:4};
let token ={
    data,
    hash: SHA256(JSON.stringify(data) + 'somesceret').toString()
}

// data change code 
// token.data.id=5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

let resulthash = SHA256(JSON.stringify(token.data) + 'somesceret').toString();

if(resulthash===token.hash){
    console.log('Data was not changed');
}
else{
    console.log('Data was changed'); 
}