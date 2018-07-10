#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');
var callback = function(error, response, context){}

console.log("Number//Route Management v2 & Messaging v2.1 Demo");

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = process.env.FR_ACCESS_KEY
flowroute.Configuration.password = process.env.FR_SECRET_KEY
mobile_number = process.env.MOBILE_NUMBER

// Instantiate API client and create controllers for Numbers, Messages, and Routes
var e911s_controller = flowroute.E911sController;
var numbers_controller = flowroute.NumbersController;

var e911address = {"data":{"type": "e911", "attributes":{"label": "First e911 record", "first_name": "Bob", "last_name": "Law", "street_number": "123", "street_name": "Smith St", "city": "Seattle", "state": "WA", "country": "US", "zip": "98101"}}};
e911Address = e911s_controller.createAndValidateANewE911Address(e911address, callback);
e911Address.then(function(response) {
  console.log("--Create and Validate a New E911 Address")
  console.log(response);
}, function(err) {
  console.log(err);
});


//List E911 Addresses on Account

var e911_result = "";
var e911_id = null;
var e911_addresses = e911s_controller.listAccountE911Addresses(limit=3, callback);
e911_addresses.then(async (response) => {
  e911_result = response;
  e911_id = e911_result['data'][0]['id'];

  console.log("--List Account E911 Addresses")
  console.log(JSON.stringify(e911_result, null, 2));

  console.log("--List E911 Record Details")
  var e911_address_details = await e911s_controller.listE911RecordDetails(e911_id, callback);
  console.log(JSON.stringify(e911_address_details, null, 2));

}, function(err) {
  console.log(err);
});

