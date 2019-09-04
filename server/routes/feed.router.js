const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/needed', rejectUnauthenticated,   (req,res)=> {
  console.log('In FEED ROUTER GET YOUR FEED')
  // const sqlText = `SELECT * from "event_needed"
  // WHERE requester_id = $1;`;

  const sqlText = `SELECT "event_needed"."id", "event_offered"."id", "event_needed"."event_date" as need_date,
  "event_offered"."event_date" as offered_date, to_char("event_needed"."event_time_start", 'HH:MI') as need_start, 
  to_char("event_offered"."event_time_start", 'HH:MI') as offered_start, to_char("event_needed"."event_time_end", 'HH:MI') as need_end, 
  to_char("event_offered"."event_time_end", 'HH:MI') as offered_end, "event_needed"."total_hours" as needed_total_hours, "event_offered"."total_hours" as offered_total_hours, 
  "event_needed"."event_confirmed", "event_offered"."event_confirmed", "event_needed"."requester_id", "event_offered"."requester_id", 
  "event_needed"."claimer_id", "event_needed"."claimer_id","event_offered"."group_id", "event_needed"."event_offered_id", 
  "event_offered"."event_needed_id"  FROM "event_needed"
  JOIN "event_offered" on "event_needed_id" = "event_needed"."id"
  WHERE "event_needed"."requester_id" = $1
  ORDER BY "event_needed"."id";`;

  const value = [req.user.id];

  pool.query(sqlText, value)
  .then((response)=> {
    console.log('response.rows', response.rows)
    res.send(response.rows[0])
  })
  .catch((error)=> {
    console.log('Error getting from event_needed table', error);
    res.sendStatus(500);
  })

})

router.get('/offered', rejectUnauthenticated,   (req,res)=> {
  console.log('In FEED ROUTER GET YOUR FEED')
  const sqlText = `SELECT * from event_offered
  WHERE requester_id= $1;`;
  const value = [req.user.id];
  pool.query(sqlText, value)
  .then((response)=> {
    console.log('respnse from DB', response);
    res.send(response.rows[0]);
    
  })
  .catch((error) => {
    console.log('Error getting from event_offered table', error);
    res.sendStatus(500);
    
  })
})

router.get('/start', (req,res)=> {

})

module.exports = router;

