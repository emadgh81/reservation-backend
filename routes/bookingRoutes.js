const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {bookingSchema} = require('../validations/bookingValidation');
const {validateBody} = require('../middlewares/validationMiddleware');
const {verifyCustomerToken} = require('../middlewares/authMiddleware');

router.post('/' , validateBody(bookingSchema), (req , res) => {
    const {employerId , customerId , date , time} = req.body

    db.query(
        `INSERT INTO bookings (employerId , customerId , date , time) VALUES (? , ? ,? ,?)` , 
        [customerId , employerId || null , date , time] ,
        (err , result) => {
            if (err) {
                return res.status(500).json({err});
            };
            res.status(200).json({
                message : `booking created` , 
                bookingId : result.insertId
            });
        });
});

router.put('/chose/:id' , verifyCustomerToken , (req , res) => {
    const bookingId = req.params.id;
    const customerId = req.user.id;

    db.query(`UPDATE bookings SET customerId=? WHERE id=?` , [customerId , bookingId] , (err , result) => {
        if (err) {
            return res.status(500).json({err});
        };
        res.status(200).json({message : `booking selected successfully`});
    });
});

router.get('/' ,(req , res ) => {
    db.query(`SELECT * FROM bookings` , (err , result) => {
        if (err) {
            return res.status(500).json({err});
        };
        res.status(200).json({result})
    });
});

module.exports = router