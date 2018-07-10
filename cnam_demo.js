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

var cnam = {"value":"Jerk Shack"};

var cnam_result = "";
var cnam_id = null;
var cnam_records = cnams_controller.listAccountCNAMRecords(limit=3, offset=null, isApproved=true, callback);
cnam_records.then(async (response) => {
  cnam_result = response;
  cnam_id = cnam_result['data'][0]['id'];

  console.log("--List Approved CNAM Records")
  console.log(JSON.stringify(cnam_result, null, 2));

  console.log("--List CNAM Record Details")
  var cnam_details = await cnams_controller.listE911RecordDetailslistCNAMRecordDetails(cnam_id, callback);
  console.log(JSON.stringify(cnam_details, null, 2));
  /*
  console.log("--Validate an E911 Address")
  var new_e911address = await e911s_controller.createValidateAnE911Address(e911address, callback);
  console.log(JSON.stringify(new_e911address, null, 2));
  
  console.log("--Create and Validate an E911 Address")
  new_e911address = await e911s_controller.createAndValidateANewE911Address(e911address, callback);
  console.log(JSON.stringify(new_e911address, null, 2));
  
  console.log("--Update and Validate an E911 Address")
  var updated_e911address = await e911s_controller.updateAndValidateAnExistingE911Address(e911_id, updatedaddress, callback);
  console.log(JSON.stringify(updated_e911address, null, 2));
 
  console.log("--Assign An E911 Address to a Phone Number")
  var e911_number_association = await e911s_controller.updateAssignAValidE911AddressToYourPhoneNumber(numberId=12065014286, e911_id, callback)
  console.log(JSON.stringify(e911_number_association, null, 2));
  
  console.log("--List Phone Numbers Associated with an E911 Record")
  var e911_numbers = await e911s_controller.listPhoneNumbersWithE911Record(e911_id, callback);
  console.log(JSON.stringify(e911_numbers, null, 2));
  
  console.log("--Deactivate E911 Service for a Phone Number")
  var deactivate_e911 = await e911s_controller.deleteDeactivateE911ServiceForYourPhoneNumber(numberId=12065014286, callback)
  console.log(JSON.stringify(deactivate_e911, null, 2));
  
  console.log("--Delete E911 Record")
  var delete_e911 = await e911s_controller.removeAnE911AddressFromYourAccount(e911_id, callback)
  console.log(JSON.stringify(delete_e911, null, 2));
*/
}, function(err) {
  console.log(err);
});

