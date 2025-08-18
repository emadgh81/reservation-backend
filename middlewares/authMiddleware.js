const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyCustomerToken = (req, res , next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message : 'no token provided'});
    };
    jwt.verify(token, process.env.JWT_SECRET , (err , decoded) => {
        if (err) {
            return res.status(401).json({message : 'unauthorized'});
        };
        next()
    });
};

module.exports = {verifyCustomerToken}