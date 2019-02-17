const { User } = require('../models/user');

/**
 * define middleware to authenticate the users and make routes private
 */
let authenticate = (req, res, next) => {
    let token = req.header("x-auth");

    User.findByToken(token).then((user) => {
        if (!user) {
            return new Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();

    }).catch((err) => {
        res.status(401).send();
    });
};

module.exports={ authenticate };