#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');
var callback = function(error, response, context){}

console.log("E911 Address Management Demo");

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = process.env.FR_ACCESS_KEY
flowroute.Configuration.password = process.env.FR_SECRET_KEY
mobile_number = process.env.MOBILE_NUMBER

// Instantiate API client and create controllers for Numbers, Messages, and Routes
var e911s_controller = flowroute.E911sController;
var numbers_controller = flowroute.NumbersController;

var e911address = {"data":{"type": "e911", "attributes":{"label":"Belfry Oddities II", "first_name": "Jim", "last_name": "Law", "street_number": "123", "street_name": "Smith St", "city": "Seattle", "state": "WA", "country": "US", "zip": "98101"}}};
var updatedaddress = {"data":{"type": "e911", "attributes":{"label": "Funeral Homes", "first_name": "Death", "last_name": "Crow"}}};

var e911_addresses = e911s_controller.listAccountE911Addresses(limit=3, callback);
e911_addresses.then(async (response) => {
  let e911_result = response;
  var e911_id = null;
  console.log("--List Account E911 Addresses")
  console.log(JSON.stringify(e911_result, null, 2));

  if (e911_result['data'].length) {
    console.log(e911_result['data'] + "\n")
    // find the address from above
    let e911_match = e911_result['data'].filter((address) => {
        console.log("address", address, "\n")
        if (address['attributes']['label'] == e911address['data']['attributes']['label']
            || address['attributes']['label'] == updatedaddress['data']['attributes']['label']) {
          console.log("matched!")
          return address;
        }
    })
    if (e911_match.length) {
      e911_id = e911_match[0]['id']
    } else {
      console.log("\n--Validate an E911 Address")
      var valid_e911address = await e911s_controller.validateAnE911Address(e911address, callback);
      console.log(JSON.stringify(valid_e911address, null, 2));
      
      console.log("\n--Create and Validate an E911 Address")
      // Adding an address doesn't charge a fee
      var new_e911address = await e911s_controller.createAndValidateANewE911Address(e911address, callback);
      console.log(JSON.stringify(new_e911address, null, 2));

      e911_id = new_e911address['data']['id'];
    }

    console.log("--List E911 Record Details")
    var e911_address_details = await e911s_controller.listE911RecordDetails(e911_id, callback);
    console.log(JSON.stringify(e911_address_details, null, 2));
    
    console.log("\n--Update and Validate an E911 Address")
    // Updating the address doesn't charge a fee
    var updated_e911address = await e911s_controller.updateAndValidateAnExistingE911Address(e911_id, updatedaddress, callback);
    console.log(JSON.stringify(updated_e911address, null, 2));

    // This charges a fee when you add a E911 address to a number
    console.log("--Assign An E911 Address to a Phone Number")
    var e911_number_association = await e911s_controller.updateAssignAValidE911AddressToYourPhoneNumber(numberId=mobile_number, e911_id, callback)
    console.log(JSON.stringify(e911_number_association, null, 2));
    
    console.log("--List Phone Numbers Associated with an E911 Record")
    var e911_numbers = await e911s_controller.listPhoneNumbersWithE911Record(e911_id, callback);
    console.log(JSON.stringify(e911_numbers, null, 2));
    
    console.log("--Deactivate E911 Service for a Phone Number")
    var deactivate_e911 = await e911s_controller.deleteDeactivateE911ServiceForYourPhoneNumber(numberId=mobile_number, callback)
    console.log(JSON.stringify(deactivate_e911, null, 2));
    
    console.log("--Delete E911 Record")
    var delete_e911 = await e911s_controller.removeAnE911AddressFromYourAccount(e911_id, callback)
    console.log(JSON.stringify(delete_e911, null, 2));
  } else {
    console.log("No E911 addresses available to test.")
    // In a real application this would create an address and continue with the remainder of calls
  }
}).catch(function(err) {
  console.log("ERROR HAPPENED")
  console.log(err);
});

