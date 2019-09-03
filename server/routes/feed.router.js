const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated,   (req,res)=> {
  console.log('In FEED ROUTER GET YOUR FEED')
})

module.exports = router;

