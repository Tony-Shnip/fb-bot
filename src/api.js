'use strict'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serverless = require("serverless-http");
const processPostback = require('./processes/postback');
const processMessage = require('./processes/messages');

const app = express();
const router = express.Router();

router.get('/webhook', function(req, res) {
  
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
  // Check the mode and token sent is correct
  if (mode === "subscribe" && token === 'qwerty') {
     // Respond with the challenge token from the request
     console.log("WEBHOOK_VERIFIED");
     res.status(200).send(challenge);
  } else {
     // Respond with '403 Forbidden' if verify tokens do not match
     res.sendStatus(403);
  }
  }
});

router.post('/webhook', function(req, res) {
  //checking for page subscription.
  if (req.body.object === 'page'){
     
     /* Iterate over each entry, there can be multiple entries 
     if callbacks are batched. */
     req.body.entry.forEach(function(entry) {
     // Iterate over each messaging event
        entry.messaging.forEach(function(event) {
        console.log('eventttt' + event);
        if (event.postback){
           processPostback(event);
        } else if (event.message){
           processMessage(event);
        }
    });
  });
  res.sendStatus(200);
 }
});

// app configuration
app.set('port', (process.env.PORT || 3000));


// setup our express application
app.use(morgan('dev')); // log every request to the console.
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json()); 
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);

// warming up the engines !! setta !! go !!!.
// app.listen(app.get('port'), function() {
//   const url = 'http://localhost:' + app.set('port');
//   console.log('Application running on port: ', app.get('port'));
// });