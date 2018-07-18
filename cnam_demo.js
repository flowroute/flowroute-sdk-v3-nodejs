#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');
var callback = function(error, response, context){}

console.log("CNAM v2 Demo");

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = process.env.FR_ACCESS_KEY
flowroute.Configuration.password = process.env.FR_SECRET_KEY
mobile_number = process.env.MOBILE_NUMBER

// Instantiate API client and create controllers for Numbers, Messages, and Routes
var cnams_controller = flowroute.CnamsController;
var numbers_controller = flowroute.NumbersController;

var delete_cnam = cnams_controller.deleteACNAMRecord(22790, callback)
delete_cnam.then(function(response) {
    console.log("--Delete a CNAM Record")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var disassociate_cnam = cnams_controller.deleteUnassignACNAMRecordFromYourPhoneNumber(12065014286, callback)
disassociate_cnam.then(function(response) {
    console.log("--Unassign a CNAM Record from a Phone Number")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var associate_cnam = cnams_controller.updateAssignACNAMRecordToYourPhoneNumber(numberID=12065014286, cnamID=22790, callback);
associate_cnam.then(function(response) {
    console.log("--Associate a CNAM Record with a Phone Number")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var new_cnam = { "value":"Heartwood" };
var create_cnam = cnams_controller.createANewCNAMRecord(new_cnam, mContentType="application/vnd.api+json", callback);
create_cnam.then(function(response) {
    console.log("--Create a CNAM Record")
    console.log(JSON.stringify(response, null, 2));
    console.log("Note that CNAM records take 24-48 hours before getting approved.");
}, function(err) {
  console.log(err);
});

var account_cnams = cnams_controller.listAccountCNAMRecords(limit=3, offset=null, isApproved=true, callback);
account_cnams.then(function(response) {
    console.log("--List Approved CNAM Records")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var cnam_details = cnams_controller.listCNAMRecordDetails(22790, callback)
cnam_details.then(function(response) {
    console.log("--List CNAM Record Details")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

