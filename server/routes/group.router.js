const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('in /group with this id:', req.params.id);
    const values = req.params.id;
    const sqlText = `SELECT * FROM "groups" where "groups"."id"=$1`;
    pool.query(sqlText, [values])
        .then((response) => {
            console.log(response.rows[0]);
            res.send(response.rows[0])
        }).catch((error) => {
            console.log('error getting group data', error);
            res.sendStatus(500);
        })
})
module.exports = router;