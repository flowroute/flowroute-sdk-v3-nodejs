#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');

console.log("Number/Route Management v2 & Messaging v2.1 Demo");

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = process.env.FR_ACCESS_KEY;
flowroute.Configuration.password = process.env.FR_SECRET_KEY;
mobile_number = process.env.MOBILE_NUMBER;

// Instantiate API client and create controllers for Numbers, Messages, and Routes
const numbers_controller = flowroute.NumbersController;
const routes_controller = flowroute.RoutesController;
const messagesController = flowroute.MessagesController;

var finished = false;
const max_setup_cost = 3.25;
const limit = 3;
const offset = 0;

var callback = function (error, response, context) { }

let areacodes = numbers_controller.listAvailableAreaCodes(limit, offset, max_setup_cost, callback);
areacodes.then(async function (response) {
  console.log("--List Available Area Codes")
  console.log(response);

  var areacode = 206;
  excodes = await numbers_controller.listAvailableExchangeCodes(limit, offset, max_setup_cost, areacode, callback);
  console.log("--List Available Exchange Codes")
  console.log(excodes);

  var starts_with = 1206
  var contains = 3
  var ends_with = 7
  var rate_center = "Seattle"
  var state = "WA"
  ppnumbers = await numbers_controller.searchForPurchasablePhoneNumbers(starts_with, contains, ends_with, limit, offset, rate_center, state, callback)
  console.log("--Search for Purchasable Phone Numbers")
  console.log(ppnumbers);

  accountnumbers = await numbers_controller.getAccountPhoneNumbers(callback)
  console.log("--List Account Phone Numbers")
  console.log(accountnumbers);

  var numberID = mobile_number;
  /*numberpurchase = numbers_controller.purchaseAPhoneNumber(numberID, callback)
  console.log("--Purchase a Phone Number")
  console.log(numberpurchase);
  */

  numberdetails = await numbers_controller.getPhoneNumberDetails(numberID, callback)

  console.log("--List Phone Number Details")
  console.log(numberdetails);

  accountroutes = await routes_controller.listInboundRoutes(limit, callback)
  console.log("--List Inbound Routes")
  console.log(accountroutes);

  request_body = {
    "data": {
      "type": "message",
      "attributes": {
        "to": String(mobile_number),
        "from": String(numberID),
        "body": "hello there",
        "is_mms": "true",
        "media_urls": ["http://s3.amazonaws.com/barkpost-assets/50+GIFs/37.gif"]
      }
    }
  }
  console.log("request", request_body)

  result = await messagesController.createSendAMessage(request_body)
  console.log("Message result")
  console.log(result)

  var mdrInfo = JSON.parse(result)
  console.log(mdrInfo)
  var mdrId = mdrInfo['data']['id']
  console.log("getting ", mdrId)
  // MDR Info takes a few seconds to make it through Flowroute queue and be sent
  setTimeout(async function () {
    try {
      mdrdetailed = await messagesController.lookUpAMessageDetailRecord(mdrId, callback)
      console.log("--Look Up a Message Detail Record")
      console.log(mdrdetailed);
    } catch (err) {
      console.log("error fetching mdr", err)
    }
    finished = true;
  }, 10000);

}, function (err) {
  console.log(err);
});

function wait () {
  if (!finished)
       setTimeout(wait, 1000);
};
wait();