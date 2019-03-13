#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');
var callback = function(error, response, context){}

console.log("CNAM v2 Demo");

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = process.env.FR_ACCESS_KEY || 'UNCONFIGURED'
flowroute.Configuration.password = process.env.FR_SECRET_KEY || 'UNCONFIGURED'
mobile_number = process.env.MOBILE_NUMBER || 12065014286
cnam_name = process.env.CNAM_NAME || "Heartwood"

// Instantiate API client and create controllers for Numbers, Messages, and Routes
var cnams_controller = flowroute.CnamsController;
var numbers_controller = flowroute.NumbersController;

var new_cnam = { "value": cnam_name };
var create_cnam = cnams_controller.createANewCNAMRecord(new_cnam, mContentType="application/vnd.api+json", callback);
create_cnam.then(function(response) {
    console.log("--Create a CNAM Record")
    console.log(JSON.stringify(response, null, 2));
    console.log("Note that CNAM records take 24-48 hours before getting approved.");
}, function(err) {
  console.log('createANewCNAMRecord')
  console.log(err);
  console.log('If you have run this script more than once, it will error with a 422: Duplicate CNAM entry found on your account\n');
});

console.log("\n");

var account_cnams = cnams_controller.listAccountCNAMRecords(limit=3, offset=null, isApproved=true, callback);
account_cnams.then(function(response) {
  console.log("--List Approved CNAM Records")
  console.log(JSON.stringify(response, null, 2));
  console.log();
  let cnams_list = response.data;

  if (cnams_list.length == 0) {
    console.log("Cannot proceed with demo without a valid CNAM")
    process.exit();
  }

  let cnamId = cnams_list[0].id;
  console.log('--Using CNAM ' + cnamId + ' for Queries\n');
  var cnam_details = cnams_controller.listCNAMRecordDetails(cnamId, callback)
  cnam_details.then(function(response) {
      console.log("--List CNAM Record Details")
      console.log(JSON.stringify(response, null, 2));
  }, function(err) {
    console.log('listCNAMRecordDetails');
    console.log(err);
  });

  console.log('Associating CNAM ' + cnamId + ' with number ' + mobile_number + '\n');

  var associate_cnam = cnams_controller.updateAssignACNAMRecordToYourPhoneNumber(numberID=mobile_number, cnamID=cnamId, callback);
  associate_cnam.then(function(response) {
      console.log("--Associate a CNAM Record with a Phone Number")
      console.log(JSON.stringify(response, null, 2));

      console.log("\n")
      // this is inside the associate because it requires the previous call to succeed
      var disassociate_cnam = cnams_controller.deleteUnassignACNAMRecordFromYourPhoneNumber(mobile_number, callback)
      disassociate_cnam.then(function(response) {
          console.log("--Unassign a CNAM Record from a Phone Number")
          console.log(JSON.stringify(response, null, 2));
      }, function(err) {
        console.log('deleteUnassignACNAMRecordFromYourPhoneNumber');
        console.log(err);
        console.log('This fails with a 404 error unless you configured your mobile_number')
      });

      
  }, function(err) {
    console.log('updateAssignACNAMRecordToYourPhoneNumber')
    console.log(err);
    console.log('This fails with a 404 error unless you configured your mobile_number')
  });




  /*
  // An example of how to delete a CNAM
  var delete_cnam = cnams_controller.deleteACNAMRecord(22790, callback)
  delete_cnam.then(function(response) {
      console.log("--Delete a CNAM Record")
      console.log(JSON.stringify(response, null, 2));
  }, function(err) {
    console.log('deleteACNAMRecord');
    console.log(err);
  });
  */

}, function(err) {
  console.log('listAccountCNAMRecords')
  console.log(err);
});