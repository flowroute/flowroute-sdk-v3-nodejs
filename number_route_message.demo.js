#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');

console.log("Number//Route Management v2 & Messaging v2.1 Demo");

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = process.env.FR_ACCESS_KEY
flowroute.Configuration.password = process.env.FR_SECRET_KEY
mobile_number = process.env.MOBILE_NUMBER

// Instantiate API client and create controllers for Numbers, Messages, and Routes
var numbers_controller = flowroute.NumbersController;
var routes_controller = flowroute.RoutesController;
var messages_controller = flowroute.MessagesController;

var max_setup_cost = 3.25;
var limit = 3;
var offset = 0;

var callback = function(error, response, context){}

areacodes = numbers_controller.listAvailableAreaCodes(limit, offset, max_setup_cost, callback);
areacodes.then(function(response) {
  console.log("--List Available Area Codes")
  console.log(response);
}, function(err) {
  console.log(err);
});

var areacode = 206;
excodes = numbers_controller.listAvailableExchangeCodes(limit, offset, max_setup_cost, areacode, callback);

excodes.then(function(response) {
  console.log("--List Available Exchange Codes")
  console.log(response);
}, function(err) {
  console.log(err);
});

var starts_with = 1206
var contains = 3
var ends_with = 7
var rate_center = "Seattle"
var state = "WA"
ppnumbers = numbers_controller.searchForPurchasablePhoneNumbers(starts_with, contains, ends_with, limit, offset, rate_center, state, callback)
ppnumbers.then(function(response) {
  console.log("--Search for Purchasable Phone Numbers")
  console.log(response);
}, function(err) {
  console.log(err);
});

var numberID = 12065014377
/*purchasenumber = numbers_controller.purchaseAPhoneNumber(numberID, callback)
purchasenumber.then(function(response) {
  console.log("--Purchase a Phone Number")
  console.log(response);
}, function(err) {
  console.log(err);
});*/

accountnumbers = numbers_controller.getAccountPhoneNumbers(callback)
accountnumbers.then(function(response) {
  console.log("--List Account Phone Numbers")
  console.log(response);
}, function(err) {
  console.log(err);
});

numberdetails = numbers_controller.getPhoneNumberDetails(numberID, callback)
numberdetails.then(function(response) {
  console.log("--List Phone Number Details")
  console.log(response);
}, function(err) {
  console.log(err);
});

accountroutes = routes_controller.listInboundRoutes(limit, callback)
accountroutes.then(function(response) {
  console.log("--List Inbound Routes")
  console.log(response);
}, function(err) {
  console.log(err);
});

var message_id = "mdr2-ca82be46e6ba11e79d08862d092cf73d"
mdrdetailed = messages_controller.lookUpAMessageDetailRecord(message_id, callback)
mdrdetailed.then(function(response) {
  console.log("--Look Up a Message Detail Record")
  console.log(response);
}, function(err) {
  console.log(err);
});

