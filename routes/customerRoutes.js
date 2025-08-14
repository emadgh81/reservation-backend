const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../config/db')
const {validateBody} = require('../middlewares/validationMiddleware');
const {registerSchema , loginSchema} = require('../validations/customerValidation');
dotenv.config();

router.post('/register' , validateBody(registerSchema) , (req , res) => {
  const {email , name , password} = req.body
  
  db.query(`INSERT INTO customers (name , email , password) VALUES (? , ? , ?)` , [name , email , password] , (err , result) => {
    if (err) {
      return res.status(500).json({err});
    };
    res.status(200).json({message : `customer registered`});
  });
});

router.post('/login' , validateBody(loginSchema) , (req , res) => {
  const { email , password} = req.body

  db.query(`SELECT * FROM customers WHERE email=? AND password=?` , [email , password ] , (err , results) => {
    if (err) {
      return res.status(500).json({err});
    };
    if (!results.length) {
      res.status(400).json({message : `invalid credentials`});
    };

    const token = jwt.sign({id : results[0].id , name : results[0].name} , process.env.JWT_SECRET || `secret` , {expiresIn : `1h`});
    res.status(200).json({
      message : `login successfully`,
      token
    });
  });
});

module.exports = router