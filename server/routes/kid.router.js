const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('in /kid with this id:', req.params.id);
    const values = req.params.id;
    const sqlText = `SELECT kid.first_name, kid.last_name, kid.id, kid.allergies, kid.birthdate, kid.image, kid.medication, kid.notes from "kid"  join
                    "family" on kid.family_id = family.id
                    join "user" on family.user_id = "user".id
                    where "user".id =$1;`;
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