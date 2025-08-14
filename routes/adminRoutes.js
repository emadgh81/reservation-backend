const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {registerSchema , otpSchema} = require('../validations/adminValidation');
const {validateBody }= require('../middlewares/validationMiddleware');

router.post('/register' , validateBody(registerSchema) , (req, res) => {
    const {name , phone} = req.body
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    db.query(`INSERT INTO admins(name , phone , otp) VALUES (? ,? ,? )` , [name , phone , otp] , (err , result) => {
        if (err) {
            return res.status(500).json({err});
        };
        res.status(200).json({
            message : `admin registered. sent otp` , 
            otp
        });
    });
});

router.post('/verify-otp' , validateBody(otpSchema) , (req, res) => {
    const {phone , otp} = req.body
    
    db.query(`SELECT * FROM admins WHERE phone=?` , [phone] , (results , err) => {
        if (err) {
            return res.status(500).json({err});
        };
        if (!results.length) {
            return res.status(400).json({message : `admin not found`});
        };

        const admin = results[0]
        if (admin.otp !== otp) {
            return res.status(400).json({message : `invalid otp`});
        };

        db.query(`UPDATE admins SET isVerified=1 WHERE id=?` , [admin.id] , (err2) => {
            if (err2) {
                return res.status(500).json({err2});
            };
            res.status(200).json({message : `otp verified successfully`});
        });
    });
});

module.exports = router