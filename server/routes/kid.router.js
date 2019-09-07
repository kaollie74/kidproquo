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

router.post('/addKid', (req, res) => {
    console.log('THIS IS RED.BODY', req.body)

    const sqlText = `INSERT INTO "kid" ("first_name","last_name", "birthdate", "allergies", "medication", "image", "family_id", "notes")
                        Values($1, $2, $3, $4, $5, $6, $7, $8);`;
    values =
        [req.body.first_name, req.body.last_name, req.body.birthdate, req.body.allergies,
        req.body.medication, req.body.image, req.body.family_id, req.body.notes];
    pool.query(sqlText, values)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('ERROR with POSTING kid to DB', error)
        })
})

module.exports = router;