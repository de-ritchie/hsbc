let jwt = require('jsonwebtoken');
const config = require('../config.js');

let verifyToken = (req, res, next) => {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log('tokenn', token);
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
            success: false,
            message: 'Token is not valid'
            });
        } else {
            req.decoded = decoded;
            next();
        }
        });
    } else {
        return res.json({
        success: false,
        message: 'Auth token is not supplied'
        });
    }
};

module.exports =  verifyToken;