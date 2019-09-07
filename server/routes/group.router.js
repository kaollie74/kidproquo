const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//gets all relevant info for group view
router.get('/:id', (req, res) => {
    console.log('in /group with this id:', req.params.id);
    const values = req.params.id;
    const sqlText = `select "family"."image" as "claimer_image", "family2"."image" as "requester_image", "family2"."last_name1" as "requester_name", "family"."last_name1" as "claimer_name", "event"."id", "event"."event_date", "event"."event_time_start", "event"."event_time_end", "event"."event_claimed"from "event"
                    left join "family" on
                    "event"."claimer_id" = "family"."id"
                    left join "family" as "family2" on
                    "event"."requester_id" = "family2"."id"
                    where "event"."group_id"=$1;`;
    pool.query(sqlText, [values])
        .then((response) => {
            console.log('back from group db response.rows:', response.rows);
            res.send(response.rows)
        }).catch((error) => {
            console.log('error getting group data', error);
            res.sendStatus(500);
        })
})
//gets groups that user belongs to upon login
router.get('/', (req, res) => {
    console.log('getting user groups by user id:',req.user.id)
    const sqlText = `select "groups"."id", "groups"."group_name" from groups
                    join family on
                    "family"."group_id" = "groups"."id"
                    Join "user" on
                    "family"."user_id"="user"."id"
                    where "user"."id"=$1;
                    `;
    pool.query(sqlText, [req.user.id])
        .then((response) => {
            console.log('back from  users group db response.rows:', response.rows);
            res.send(response.rows)
        }).catch((error) => {
            console.log('error getting users group data', error);
            res.sendStatus(500);
        })
})






module.exports = router;