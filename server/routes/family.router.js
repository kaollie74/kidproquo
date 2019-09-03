const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



//Posts new family to the
router.post('/:id', (req, res) => {
    console.log('In family router, adding new family, req.body:', req.body)
    const sqlText = `INSERT INTO family ("first_name1", "last_name1", "first_name2", "last_name2", "email",
    "street_address", "city", "state", "zip_code", "phone_number", "user_id", "family_passcode") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`;
    pool.query(sqlText, [req.body.user_id, req.body.msg, req.body.event_id])
        .then((response) => {
            console.log(`Added family to the DB response.rows[0]:`, response.rows[0])
            res.send(response);
        })
        .catch((error) => {
            console.log(`Error adding new family to DB`, error);
            res.sendStatus(500); // Good server always responds :)
        })


});


module.exports = router;