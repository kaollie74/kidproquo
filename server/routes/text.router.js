const express = require('express');

const pool = require('../modules/pool');

require('dotenv').config();

const router = express.Router();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//Inbound text requirements
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const http = require('http');


router.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    console.log('DID THIS WORK?', req.body.Body)
    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});




//Post event and return id
router.post('/', (req, res) => {
    console.log('in send text', req.body)
    client.messages
        .create({
            body: `Hey there! KidProQuo user: ${req.body.claimer_name} has claimed to your event on ${req.body.event_date} from ${req.body.event_time_start}} to ${req.body.event_time_end}.  Log-in or call them ASAP to confirm plans. `,
            from: '+12055499527',
            to: `+1${req.body.requester_phone}`
        })
        .then(message => console.log(message.sid));

});

//Sends cancelation text to requester of event
router.post('/cancel', (req, res) => {
    console.log('in send cancel text', req.body)
    client.messages
        .create({
            body: `Hey there! KidProQuo user: ${req.body.claimer_name} has cancelled on you event on ${req.body.event_date} from ${req.body.event_time_start}} to ${req.body.event_time_end}.  Log-in or call them ASAP to confirm plans. `,
            from: '+12055499527',
            to: `+1${req.body.requester_phone}`
        })
        .then(message => console.log(message.sid));

});

//Sends cancelation text to claimer of event
router.post('/cancelConfirm ', (req, res) => {
    console.log('in send cancel text', req.body)
    client.messages
        .create({
            body: `Hey there! KidProQuo user: ${req.body.requester_name} has cancelled on your event on ${req.body.event_date} from ${req.body.event_time_start}} to ${req.body.event_time_end}.  Log-in or call them ASAP to confirm plans. `,
            from: '+12055499527',
            to: `+1${req.body.claimer_phone}`
        })
        .then(message => console.log(message.sid));

});

//Sends confirmation text to claimer of event
router.post('/confirm', (req, res) => {
    console.log('in send CONFIRM text', req.body)
    client.messages
        .create({
            body: `Hey there! KidProQuo user: ${req.body.claimer_name} has confirmed thier event on ${req.body.event_date} from ${req.body.event_time_start}} to ${req.body.event_time_end}.  Log-in or call them ASAP to confirm plans. `,
            from: '+12055499527',
            to: `+1${req.body.claimer_phone}`
        })
        .then(message => console.log(message.sid));

});







module.exports = router;