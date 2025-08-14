const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {validateBody} = require('../middlewares/validationMiddleware');
const {registerSchema , otpSchema} = require('../validations/employerValidation');

router.post('/register' , validateBody(registerSchema) , (req , res) => {
  const {phone , name} = req.body
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  db.query(`INSERT INTO employers (name , phone , otp) VALUES (? , ? , ?)` , [name , phone , otp] , (err, result) => {
    if (err) {
      return res.status(500).json(err);
    };
    res.status(200).json({
      message : `employer registered. sent otp ` ,
      otp
    });

    router.post('/verify-otp' , validateBody(otpSchema) , (req , res ) => {
      const {phone , otp } = req.body
      
      db.query(`SELECT * FROM employers WHERE phone=?` , [phone] , (err , results) => {
        if (err) {
          return res.status(500).json({err});
        };
        if (!results.length) {
          return res.status(400).json({message : `employer not found`})
        };
      });
      const employer = results[0];

      db.query(`UPDATE employers SET isVerified=1 WHERE id=?` , [employer.id] , (err2) => {
        if (err2) {
          return res.status(500).json({err2});
        };
        res.status(200).json({message : `employer registered successfully`});
      });
    });
  });
});

module.exports = router