#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');

console.log("Number//Route Management v2 & Messaging v2.1 Demo");

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = process.env.FR_ACCESS_KEY
flowroute.Configuration.password = process.env.FR_SECRET_KEY
mobile_number = process.env.MOBILE_NUMBER

// Instantiate API client and create controllers for Numbers, Messages, and Routes
var e911s_controller = flowroute.E911sController;
var numbers_controller = flowroute.NumbersController;


//var e911address = new E911Address({"label": "First e911 record"});


var callback = function(error, response, context){}
/*
e911Address = e911s_controller.createAndValidateANewE911Address(e911address, callback);
areacodes.then(function(response) {
  console.log("--Create and Validate a New E911 Address")
  console.log(response);
}, function(err) {
  console.log(err);
});
*/

e911_addresses = e911s_controller.listAccountE911Addresses(limit=3, callback);
e911_addresses.then(function(response) {
  console.log("--List Account E911 Addresses")
  console.log(response);
}, function(err) {
  console.log(err);
});
