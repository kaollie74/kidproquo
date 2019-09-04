const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('in /kid with this id:', req.params.id);
    const values = req.params.id;
    const sqlText = `SELECT * from "kid"  where family_id=$1`;
    pool.query(sqlText, [values])
        .then((response) => {
            console.log(response.rows);
            res.send(response.rows)
        }).catch((error) => {
            console.log('error getting kid data', error);
            res.sendStatus(500);
        })
})

module.exports = router;