const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/needed', rejectUnauthenticated,   (req,res)=> {
  console.log('In FEED ROUTER GET YOUR FEED')
  const sqlText = `SELECT * from "event_needed"
  WHERE requester_id = $1;`;
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
    res.send(response.rows);
    
  })
  .catch((error) => {
    console.log('Error getting from event_offered table', error);
    res.sendStatus(500);
    
  })
})

module.exports = router;

