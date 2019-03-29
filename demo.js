#!/usr/bin/env node
const flowroute = require('./lib');

console.log('Flowroute Demo');

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = 'YOUR_API_KEY';
flowroute.Configuration.password = 'YOUR_API_SECRET';

// Instantiate API client and create controllers for Numbers
const numbersController = flowroute.NumbersController;

numbersController.listAvailableAreaCodes().then((areaCodes) => {
    console.log('First 10 Available Area Codes');
    console.log(areaCodes);
}, 
(error) => {
    console.log(error);
});

const mobile_number = YOURNUMBER;
const number_id = YOURNUMBER;

const messagesController = flowroute.MessagesController;

request_body = {
    "data": {
      "type": "message",
      "attributes": {
        "to": String(mobile_number),
        "from": String(number_id),
        "body": "hello there",
        "is_mms": "true",
        "media_urls": ["http://s3.amazonaws.com/barkpost-assets/50+GIFs/37.gif"]
      }
    }
  }
  console.log("request", request_body)

  result = messagesController.createSendAMessage(request_body).then((result) => {
    console.log("Message result")
    console.log(result)
  },
  (error) => {
      console.log("Message Error", error)
  })
