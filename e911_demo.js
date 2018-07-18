#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');
var callback = function(error, response, context){}

console.log("E911 Address Management Demo");

// Set up your api credentials
flowroute.Configuration.username = process.env.FR_ACCESS_KEY
flowroute.Configuration.password = process.env.FR_SECRET_KEY

// Instantiate API client and create controllers for Numbers, Messages, and Routes
var e911s_controller = flowroute.E911sController;
var numbers_controller = flowroute.NumbersController;
var e911address = {"data":{"type": "e911", "attributes":{"label":"Belfry Oddities II", "first_name": "Jim", "last_name": "Law", "street_number": "123", "street_name": "Smith St", "city": "Seattle", "state": "WA", "country": "US", "zip": "98101"}}};
var updatedaddress = {"data":{"type": "e911", "attributes":{"label": "Funeral Homes", "first_name": "Death", "last_name": "Crow"}}};
var e911_id = 21838;

var delete_e911 = e911s_controller.removeAnE911AddressFromYourAccount(e911_id, callback)
delete_e911.then(function(response) {
    console.log("--Delete an E911 Record")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var deactivate_e911 = e911s_controller.deleteDeactivateE911ServiceForYourPhoneNumber(numberId=12065014286, callback)
deactivate_e911.then(function(response) {
    console.log("--Deactivate E911 Service for a Phone Number")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var e911_numbers = e911s_controller.listPhoneNumbersWithE911Record(numberId=12065014286, callback)
e911_numbers.then(function(response) {
    console.log("--List Phone Numbers Associated with an E911 Record")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var e911_number_association = e911s_controller.updateAssignAValidE911AddressToYourPhoneNumber(numberId=12065014286, e911_id, callback)
e911_number_association.then(function(response) {
    console.log("--Assign An E911 Address to a Phone Number")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var updated_e911address = e911s_controller.updateAndValidateAnExistingE911Address(e911_id, updatedaddress, callback)
updated_e911address.then(function(response) {
    console.log("--Update and Validate an E911 Address")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var new_e911address = e911s_controller.createValidateAnE911Address(e911address, callback);
new_e911address.then(function(response) {
    console.log("--Validate an E911 Address")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var create_e911address = e911s_controller.createAndValidateANewE911Address(e911address, callback);
create_e911address.then(function(response) {
    console.log("--Create and Validate an E911 Address")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var e911_addresses = e911s_controller.listAccountE911Addresses(limit=3, callback)
e911_addresses.then(function(response) {
    console.log("--List Account E911 Addresses")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

var e911_address_details = e911s_controller.listE911RecordDetails(e911_id, callback)
e911_address_details.then(function(response) {
    console.log("--List CNAM Record Details")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});

