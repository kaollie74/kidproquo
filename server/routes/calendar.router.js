const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req,res) => {

  console.log('in router.get for CALENDAR', req.query.date);
  
  const sqlText = `SELECT * from event_needed 
  where event_date =$1;`;
  const value = [req.query.date]
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