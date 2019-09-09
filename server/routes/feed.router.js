const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/needed', rejectUnauthenticated,   (req,res)=> {
  console.log('In FEED ROUTER GET YOUR FEED')
  // const sqlText = `SELECT * from "event_needed"
  // WHERE requester_id = $1;`;

  // const sqlText = `SELECT "event_needed"."id", "event_offered"."id", "event_needed"."event_date" as need_date,
  // "event_offered"."event_date" as offered_date, to_char("event_needed"."event_time_start", 'HH:MI') as need_start, 
  // to_char("event_offered"."event_time_start", 'HH:MI') as offered_start, to_char("event_needed"."event_time_end", 'HH:MI') as need_end, 
  // to_char("event_offered"."event_time_end", 'HH:MI') as offered_end, "event_needed"."total_hours" as needed_total_hours, "event_offered"."total_hours" as offered_total_hours, 
  // "event_needed"."event_confirmed", "event_offered"."event_confirmed", "event_needed"."requester_id", "event_offered"."requester_id", 
  // "event_needed"."claimer_id", "event_needed"."claimer_id","event_offered"."group_id", "event_needed"."event_offered_id", 
  // "event_offered"."event_needed_id"  FROM "event_needed"
  // JOIN "event_offered" on "event_needed_id" = "event_needed"."id"
  // WHERE "event_needed"."requester_id" = $1
  // ORDER BY "event_needed"."id";`;

  const sqlText = `SELECT * from "event"
  left join "family" on "family"."id" = "requester_id" 
  left join "family" as "family2" on "family2"."id" = "claimer_id" 
  where "requester_id" = $1
  ORDER By "event_date";`;

  const value = [req.user.id];

  pool.query(sqlText, value)
  .then((response)=> {
    console.log('response.rows', response.rows)
    res.send(response.rows)
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
//updates event to claimed
router.put('/update/:id', rejectUnauthenticated,  (req,res)=> {
  const sqlText = `UPDATE "event" SET "event_claimed"=$1, "claimer_id"=$2, "claimer_notes"=$3 WHERE id =$4;`;
  console.log(req.body.event_claimed)
  values = [req.body.event_claimed, req.body.claimer_id, req.body.claimer_notes, req.params.id];
  pool.query(sqlText, values)
  .then((response) => {
    res.sendStatus(200);
  })
  .catch((error)=> {
    console.log('Error with UPDATING the DB', error);
    res.sendStatus(500);
  })
})
//updates event to confirmed
router.put('/updateConfirm/:id', rejectUnauthenticated,  (req, res) => {
  console.log('in updateConfirm event', req.body.event_confirmed)
  const sqlText = `UPDATE "event" SET "event_confirmed"=$1, 
  WHERE "id" =$3`;
  values = [req.body.event_confirmed, req.params.id];
  pool.query(sqlText, values)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error with UPDATING EVENT CONFIRM the DB', error);
      res.sendStatus(500);
    })
})

router.post('/addRequest', rejectUnauthenticated, (req,res)=> {
  const sqlText = `insert into "event" ("event_date", "event_time_start", "event_time_end", "group_id", "notes", "requester_id", "offer_needed")
  values($1, $2, $3, $4, $5, $6, $7)`;
  values = [req.body.event_date, req.body.event_time_start, req.body.event_time_end, req.body.group_id, req.body.notes, req.body.requester_id, req.body.offer_needed];
  pool.query(sqlText, values)
  .then((response) => {
    res.sendStatus(201);
  })
  .catch((error)=> {
    console.log('Error with UPDATING the DB', error);
    res.sendStatus(500);
  })
})


module.exports = router;

