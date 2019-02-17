const bcrypt = require('bcryptjs');

let password = '123456';
// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     });
// });

var hashPassword ='$2a$10$FsUPlo4DAvyNyEl4N3oaM.8RXZqRyl/A3s.3POro2SpBpuLymKW0y';
bcrypt.compare(password,hashPassword,(err,result)=>{
    console.log(result);
});