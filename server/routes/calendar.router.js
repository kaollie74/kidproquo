const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req,res) => {

  console.log('in router.get for CALENDAR', req.query.event_date);
  
  // const sqlText = `SELECT * from event
  // where event_date =$1;`;

  const sqlText = `SELECT "event"."id", "event_date", "event"."requester_id", to_char("event"."event_time_start", 'HH:MI') as event_time_start, 
  to_char("event"."event_time_end", 'HH:MI') as event_time_end, "event"."event_confirmed", "event"."notes", "event"."offer_needed", 
  "event"."event_claimed", "event"."group_id", "event"."claimer_id", "family"."last_name1" from "event"
  JOIN "family" on "family"."id" = "event"."requester_id"
  WHERE "event_date" = $1
  AND "event_claimed"=false;`;

  const value = [req.query.event_date]
  pool.query(sqlText, value)
  .then((response)=> {
    res.send(response.rows)
  })
  .catch((error)=> {
    console.log('Error with getting events from DB', error);
    res.sendStatus(500);    
  })
})

module.exports = router;