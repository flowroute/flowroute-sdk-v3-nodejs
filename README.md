Flowroute Node.js Library v3
=====================

The Flowroute Node.js library v3 provides functions for interacting with [Numbers v2](https://developer.flowroute.com/api/numbers/v2.0/) and [Messages v2.1](https://developer.flowroute.com/api/messages/v2.1/) of the [Flowroute](https://www.flowroute.com) API.

**Topics**

*   [Requirements](#requirements)
*   [Installation](#installation)
*   [Usage](#usage)
    *   [Controllers](#controllers)
        * [Numbers Controller](#numberscontroller)
        * [Routes Controller](#routescontroller)
        * [Messages Controller](#messagescontroller)
        * [E911s Controller](#e911scontroller)
        * [CNAMs Controller](#cnamscontroller)
    *   [Credentials](#credentials)
    *   [Methods](#functions)
    *   [Errors](#errors)

* * *
Requirements
------------

*   Flowroute [API credentials](https://manage.flowroute.com/accounts/preferences/api/)
*   [Node.js](https://github.com/nodejs/Release#release-schedule) v6.10.3 or higher


* * *
Installation
------------

1. First, start a shell session and clone the Node.js library:
    * via HTTPS: `git clone https://github.com/flowroute/flowroute-sdk-v3-nodejs.git`

    * via SSH: `git@github.com:flowroute/flowroute-sdk-v3-nodejs.git`

2. Switch to the newly-created `flowroute-sdk-v3-nodejs` directory. `npm` is installed by default when Node is installed on your machine. This version of the library has been tested with `Node v6.10.3` and `npm 3.10.10` for Mac OS X. To see which version of `npm` is installed on your machine, run the following:

`npm --version`

**Node.js Library v3** should come with a `package.json` file listing all the required dependencies. Depending on your `npm` permissions, you may be required to preface each `npm` command with `sudo`. To install the dependencies, run:

`npm install`

If you encounter any missing package error, run the following:

`npm install <package_name`

* * *
Usage
------------
In Flowroute's approach to building the Node.js library v3, HTTP requests are handled by controllers named after the API resources they represent: **Numbers**, **Routes**, **Messages**, **E911s**, and **CNAMs**. These controllers contain the tasks and callback functions used to perform messaging and number management which includes programmatic configuration of inbound voice routes, E911 addresses, and CNAM storage within the Node.js library.

## Controllers

### NumbersController

Contains all of the functions necessary to search through Flowroute's phone number inventory, purchase a phone number, and review details of your account phone numbers.

*   [listAvailableAreaCodes(options, callback)](#listavailableareacodes) \- Returns a list of all Numbering Plan Area (NPA) codes containing purchasable phone numbers. All request parameters are optional. If you don't specify a limit, results are limited to the first 10 items.
*   [listAvailableExchangeCodes(options, callback)](#listavailableexchangecodes) \- Returns a list of all Central Office (exchange) codes containing purchasable phone numbers. All request parameters are optional.
*   [searchForPurchasablePhoneNumbers(options, callback)](#searchforpurchasablephonenumbers) \- Searches for purchasable phone numbers by state or rate center, or by your specified search value.
*   [purchaseAPhoneNumber(numberId, callback)](#purchaseaphonenumbernumberid) \- Lets you purchase a phone number from available Flowroute inventory.
*   [getAccountPhoneNumbers(options, callback)](#getaccountphonenumbersoptions-callback) \- Returns a list of all phone numbers currently on your Flowroute account. 
*   [getPhoneNumberDetails(numberId, callback)](#getphonenumberdetailsnumberid-callback) \- Returns details on a specific phone number associated with your account, including primary voice route, and failover voice route if previously configured.

### RoutesController
    
Contains the functions required to create new inbound routes, view all of your account routes, and update primary and failover voice routes for your phone numbers.
    
*   [createAnInboundRoute(routeBody, callback)](#createaninboundrouteroutebody-callback) \- Creates a new inbound route which can then be assigned as either a primary or a failover voice route for a phone number on your account.
*   [listInboundRoutes(options, callback)](#listinbounroutescallback) \- Returns a list of your inbound routes. From the list, you can then select routes to use as the primary and failover voice routes for phone numbers on your account.
*   [updatePrimaryVoiceRouteForAPhoneNumber(updateprimaryvoicerouteforaphonenumbernumberid-routebody-callback)](#update_primary_voice_routenumber_id-route_body) \- Updates the primary voice route for a phone number. You must create the route first via the `create_an_inbound_route(routebody)` function.
*   [updateFailoverVoiceRouteForAPhoneNumber(numberId, routeBody, callback)](#updatefailovervoicerouteforaphonenumbernumberid-routebody-callback) \- Updates the failover voice route for a phone number. You must create the route first via the `create_an_inbound_route(routebody)` function.

###   MessagesController
    
Contains the functions required to send an MMS or SMS, and review a specific Message Detail Record (MDR) or a set of messages.
    
*   [sendAMessage(messageBody, callback)](#sendamessagemessagebody-callback) \- Sends an SMS or MMS from a Flowroute long code or toll-free phone number to another valid phone number.
*   [look\_up\_a\_message\_detail\_record()](#lookupamessagedetailrecordmessageid) \- Searches for a specific message record ID and returns a Message Detail Record (in MDR2 format).
*   [lookUpAMessageDetailRecord(messageId, callback)](#lookupasetofmessagesstartdate-callback) \- Retrieves a list of Message Detail Records (MDRs) within a specified date range. Date and time is based on Coordinated Universal Time (UTC).

### E911sController

Contains all of the functions necessary to create, validate, update, and delete an E911 address on your account as well as assigning an E911 record to a phone number and if necessary, deactivating the E911 service for said phone number.

*   [createAndValidateANewE911Address(e911Address, callback)](#createandvalidateanewe911addresse911address-callback) \- Lets you create and validate an E911 address within the US and Canada which can then be assigned to any of the long code or toll-free numbers on your account. To assign an E911 address to your number, see "Assign a Valid E911 Address to Your Phone Number".
*   [listAccountE911Addresses(options, callback)](#listaccounte911addressesoptions-callback) \- Returns a list of all E911 records on your account by default. You can apply search filters using any of the optional query parameters.
*   [listE911RecordDetails(e911ID, callback)](#liste911recorddetailse911id-callback) \- Returns details on a specified E911 record ID.
*   [createValidateAnE911Address(e911Address, callback)](#createvalidateane911addresse911address-callback) \- Lets you validate an E911 address whether it is a new or an existing address on your account.
*   [updateAndValidateAnExistingE911Address(e911Id, e911Address, callback)](#updateandvalidateanexistinge911addresse911id-e911address-callback) \- Lets you update and validate an existing E911 address on your account. You must create the E911 address first by following "Create and Validate a New E911 Address".
*   [updateAssignAValidE911AddressToYourPhoneNumber(numberId, e911Id, callback)](#updateassignavalide911addresstoyourphonenumbernumberid-e911id-callback) \- Lets you assign a valid E911 address to a specific long code or toll-free phone number in your account. This endpoint does not return an error for subsequent attempts at associating a phone number with the same E911 record. The E911 record assignment charge only occurs on the first successful attempt. Note that you can later assign a different `e911_id` to the same phone number and will be charged accordingly.
*   [deleteDeactivateE911ServiceForYourPhoneNumber(numberId, callback)](#deletedeactivatee911serviceforyourphonenumbernumberid-callback) \- Lets you deactivate the current E911 service for your phone number.
*   [listPhoneNumbersWithE911Record(e911Id, callback)](#listphonenumberswithe911recorde911id-callback) \- Returns a list of your Flowroute long code or toll-free phone numbers associated with a specified E911 record.
*   [removeAnE911AddressFromYourAccount(e911Id, callback)](#removeane911addressfromyouraccounte911id-callback) \- Lets you delete an E911 address associated with your account. You must remove all phone number associations first before you can successfully delete the specified E911 record.

### CNAMsController

Contains all of the functions necessary to create, delete, assign and unassign CNAM records, as well as view and filter for specific CNAM records on your Flowroute account.

*   [createANewCNAMRecord(body, mContentType, callback)](#createanewcnamrecordbody-mcontenttype-callback) \- Lets you create a Caller ID record for your account which can then be assigned to any of your long code numbers. To assign a CNAM record to your number, see "Assign a CNAM Record to a Phone Number".
*   [listAccountCNAMRecords(options, callback)](#listaccountcnamrecordsoptions-callback) \- Returns a list of all CNAM records on your account by default. You can apply search filters using any of the optional query parameters.
*   [listCNAMRecordDetails(cnamId, callback)](#listcnamrecorddetailscnamid-callback) \- Returns details pertaining to a specific CNAM record on your account, including long code numbers that are associated with the record.
*   [updateAssignACNAMRecordToYourPhoneNumber(numberId, cnamId, callback)](#updateassignacnamrecordtoyourphonenumbernumberid-cnamid-callback) \- Lets you associate a CNAM record with a specified long code number on your account. The CNAM value will be the Caller ID name displayed when making outbound calls on the specified long code number. Your CNAM must be approved before you can associate it with a number. Note that CNAM association with a phone number takes 5-7 business days.
*   [deleteUnassignACNAMRecordFromYourPhoneNumber(numberId, callback)](#deleteunassignacnamrecordfromyourphonenumbernumberid-callback) \- Lets you unassign a CNAM record associated with a specified long code number on your account without deleting the CNAM record itself.
*   [deleteACNAMRecord(cnamId, callback)](#deleteacnamrecordcnamid-callback) \- Lets you delete a CNAM record from your account. This will automatically disassociate all numbers associated with this CNAM record.


The following shows **number_route_message_demo.js** as an example single file which imports the Flowroute API client and all the required modules. The Node.js library v3 comes with three demo files named after the API resources they interact with: **number_route_message_demo.js** for Numbers v2, Routes v2, and Messages v2.1, **e911_demo.js** for E911s v2, and **cnam_demo.js** for CNAMs v2. You can edit and run any of the demo files for testing purposes.

```node
#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');

console.log("Number//Route//E911//CNAM Management v2 & Messaging v2.1 Demo");

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = process.env.FR_ACCESS_KEY
flowroute.Configuration.password = process.env.FR_SECRET_KEY
mobile_number = process.env.MOBILE_NUMBER

// Instantiate API client and create controllers for Numbers, Messages, and Routes
var numbers_controller = flowroute.NumbersController;
var routes_controller = flowroute.RoutesController;
var messages_controller = flowroute.MessagesController;
```    

#### Credentials

As an example, we will be referencing the **number_route_message_demo.js** file. First, open up the file with your preferred code editor and replace `flowroute.Configuration.username` with your API Access Key and `flowroute.Configuration.password` with your API Secret Key from the [Flowroute Manager](https://manage.flowroute.com/accounts/preferences/api/). Note that in our example, we are accessing your Flowroute credentials as environment variables set in a `.env` file. This library should come with a configuration `.env` file that you can modify with your credentials and your mobile number for testing. To learn more about setting environment variables, see [How To Read and Set Environmental and Shell Variables](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps).

```node
// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.username = process.env.FR_ACCESS_KEY
flowroute.Configuration.password = process.env.FR_SECRET_KEY
mobile_number = process.env.MOBILE_NUMBER
```

#### Instantiate API Client and Controllers
Next, instantiate the API Client and its controllers.

```node
// Instantiate API client and create controllers for Numbers, Messages, and Routes
const flowroute = require('./lib');
var numbers_controller = flowroute.NumbersController;
var routes_controller = flowroute.RoutesController;
var messages_controller = flowroute.MessagesController;
```

## Methods
The following section will demonstrate the capabilities of Numbers v2, Routes v2, Messages v2.1, E911s v2, and CNAMs v2 that are wrapped in the Flowroute Node.js Library v3. Note that the example responses have been formatted using Mac's `pbpaste` and `jq`. To learn more, see [Quickly Tidy Up JSON from the Command Line](http://onebigfunction.com/vim/2015/02/02/quickly-tidying-up-json-from-the-command-line-and-vim/). 

### Number Management

The Flowroute Node.js library v3  allows you to make HTTP requests to the `numbers` resource of Flowroute API v2: `https://api.flowroute.com/v2/numbers`

#### listAvailableAreaCodes()

The function accepts `limit`, `offset`, `max_setup_cost`, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-available-area-codes/).
    
##### Example Request
```node
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
```

##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains an array of area code objects in JSON format.

```
{
  "data": [
    {
      "type": "areacode",
      "id": "201",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/available/exchanges?areacode=201"
      }
    },
    {
      "type": "areacode",
      "id": "202",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/available/exchanges?areacode=202"
      }
    },
    {
      "type": "areacode",
      "id": "203",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/available/exchanges?areacode=202"
      }
    },
    {
      "type": "areacode",
      "id": "203",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/available/exchanges?areacode=203"
      }
    }
  ],
  "links": {
    "self": "https://api.flowroute.com/v2/numbers/available/areacodes?max_setup_cost=3&limit=3&offset=0",
    "next": "https://api.flowroute.com/v2/numbers/available/areacodes?max_setup_cost=3&limit=3&offset=3"
  }
}
```

#### listAvailableExchangeCodes()

The function accepts `limit`, `offset`, `max_setup_cost`, `areacode`, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-available-exchanges/). 

##### Example Request
```node
var areacode = 347;
excodes = numbers_controller.listAvailableExchangeCodes(limit, offset, max_setup_cost, areacode, callback);

excodes.then(function(response) {
  console.log("--List Available Exchange Codes")
  console.log(response);
}, function(err) {
  console.log(err);
});
```
##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains an array of exchange objects in JSON format.

```
{
  "data": [
    {
      "type": "exchange",
      "id": "347215",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/available?starts_with=1347215"
      }
    },
    {
      "type": "exchange",
      "id": "347325",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/available?starts_with=1347325"
      }
    },
    {
      "type": "exchange",
      "id": "347331",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/available?starts_with=1347331"
      }
    }
  ],
  "links": {
    "self": "https://api.flowroute.com/v2/numbers/available/exchanges?areacode=347&limit=3&offset=0",
    "next": "https://api.flowroute.com/v2/numbers/available/exchanges?areacode=347&limit=3&offset=3"
  }
}
```

#### searchForPurchasablePhoneNumbers()

The function accepts `starts_with`, `contains`, `ends_with`, `limit`, `offset`, `rate_center`, `state`, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/search-for-purchasable-phone-numbers/).

##### Example Request
```
var starts_with = 206
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
```

##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains an array of phone number objects in JSON format.

```
{
  "data": [
    {
      "attributes": {
        "monthly_cost": 1.25,
        "number_type": "longcode",
        "rate_center": "seattle",
        "setup_cost": 1,
        "state": "wa",
        "value": "12062795137"
      },
      "id": "12062795137",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/12062795137"
      },
      "type": "number"
    },
    {
      "attributes": {
        "monthly_cost": 1.25,
        "number_type": "longcode",
        "rate_center": "seattle",
        "setup_cost": 1,
        "state": "wa",
        "value": "12065014237"
      },
      "id": "12065014237",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/12065014237"
      },
      "type": "number"
    },
    {
      "attributes": {
        "monthly_cost": 1.25,
        "number_type": "longcode",
        "rate_center": "seattle",
        "setup_cost": 1,
        "state": "wa",
        "value": "12065014377"
      },
      "id": "12065014377",
      "links": {
        "related": "https://api.flowroute.com/v2/numbers/12065014377"
      },
      "type": "number"
    }
  ],
  "links": {
    "next": "https://api.flowroute.com/v2/numbers/available?state=WA&contains=3&ends_with=7&rate_center=SEATTLE&starts_with=1206&limit=3&offset=3",
    "self": "https://api.flowroute.com/v2/numbers/available?state=WA&contains=3&ends_with=7&rate_center=SEATTLE&starts_with=1206&limit=3&offset=0"
  }
}
```

#### purchaseAPhoneNumber(numberID)

The function is used to purchase a telephone number from Flowroute's inventory and accepts the phone number `id` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/purchase-a-phone-number/). In the following example, we assign the `id` of the first phone number in the resulting JSON array as the phone number to be purchased. Note that this function call is currently commented out. Uncomment to test the `purchaseAPhoneNumber` method.
##### Example Request
```
var numberID = 12065014377
ppnumbers = numbers_controller.purchaseAPhoneNumber(numberID, callback)
ppnumbers.then(function(response) {
  console.log("--Purchase a Phone Number")
  console.log(response);
}, function(err) {
  console.log(err);
});
```

#### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains a phone number object in JSON format.

```
{
  "data": {
    "attributes": {
      "alias": null,
      "cnam_lookups_enabled": true,
      "number_type": "longcode",
      "rate_center": "seattle",
      "state": "wa",
      "value": "12065014377"
    },
    "id": "12065014377",
    "links": {
      "self": "https://api.flowroute.com/v2/numbers/12065014377"
    },
    "relationships": {
      "cnam_preset": {
        "data": null
      },
      "e911_address": {
        "data": null
      },
      "failover_route": {
        "data": null
      },
      "primary_route": {
        "data": {
          "id": "0",
          "type": "route"
        }
      }
    },
    "type": "number"
  },
  "included": [
    {
      "attributes": {
        "alias": "sip-reg",
        "route_type": "sip-reg",
        "value": null
      },
      "id": "0",
      "links": {
        "self": "https://api.flowroute.com/v2/routes/0"
      },
      "type": "route"
    }
  ],
  "links": {
    "self": "https://api.flowroute.com/v2/numbers/12065014377"
  }
}
```

#### getAccountPhoneNumbers(options, callback)

The function accepts `starts_with`, `ends_with`, `contains`, `limit`, `offset` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-account-phone-numbers/). 
    

##### Example Request
```node
accountnumbers = numbers_controller.getAccountPhoneNumbers(callback)
accountnumbers.then(function(response) {
  console.log("--List Account Phone Numbers")
  console.log(response);
}, function(err) {
  console.log(err);
});
```

##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains an array of phone number objects in JSON format.

```
{
  "data": [
    {
      "attributes": {
        "rate_center": "oradell",
        "value": "12012673227",
        "alias": null,
        "state": "nj",
        "number_type": "standard",
        "cnam_lookups_enabled": true
      },
      "type": "number",
      "id": "12012673227",
      "links": {
        "self": "https://api.flowroute.com/v2/numbers/12012673227"
      }
    },
    {
      "attributes": {
        "rate_center": "jerseycity",
        "value": "12014845220",
        "alias": null,
        "state": "nj",
        "number_type": "standard",
        "cnam_lookups_enabled": true
      },
      "type": "number",
      "id": "12014845220",
      "links": {
        "self": "https://api.flowroute.com/v2/numbers/12014845220"
      }
    }
  ],
  "links": {
    "self": "https://api.flowroute.com/v2/numbers?starts_with=1201&limit=3&offset=0"
  }
}
```

#### getPhoneNumberDetails(numberId, callback)

The function accepts the `numberID` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-phone-number-details/). In the following example, we request the details of the first phone number returned after calling the `list_account_phone_numbers` method.

##### Example Request
```node
numberdetails = numbers_controller.getPhoneNumberDetails(numberID, callback)
numberdetails.then(function(response) {
  console.log("--List Phone Number Details")
  console.log(response);
}, function(err) {
  console.log(err);
});
```

##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains a phone number object in JSON format.

```
{
  "included": [
    {
      "attributes": {
        "route_type": "sip-reg",
        "alias": "sip-reg",
        "value": null
      },
      "type": "route",
      "id": "0",
      "links": {
        "self": "https://api.flowroute.com/v2/routes/0"
      }
    }
  ],
  "data": {
    "relationships": {
      "cnam_preset": {
        "data": null
      },
      "e911_address": {
        "data": null
      },
      "failover_route": {
        "data": null
      },
      "primary_route": {
        "data": {
          "type": "route",
          "id": "0"
        }
      }
    },
    "attributes": {
      "rate_center": "seattle",
      "value": "12065014377",
      "alias": null,
      "state": "wa",
      "number_type": "longcode",
      "cnam_lookups_enabled": true
    },
    "type": "number",
    "id": "12065014377",
    "links": {
      "self": "https://api.flowroute.com/v2/numbers/16502390214"
    }
  },
  "links": {
    "self": "https://api.flowroute.com/v2/numbers/16502390214"
  }
}
```

### Route Management

The Flowroute Node.js library v3 allows you to make HTTP requests to the `routes` resource of Flowroute API v2: `https://api.flowroute.com/v2/routes`
    
#### createAnInboundRoute(routeBody, callback)

The function accepts the route object in JSON format and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/create-an-inbound-route/). 

##### Example Request
```node
console.log ("---Create an Inbound Route")
```

##### Example Response

On success, the HTTP status code in the response header is `201 Created` and the response body contains a route object in JSON format.

```
{
  "data": {
    "attributes": {
      "alias": "new route",
      "route_type": "host",
      "value": "il775u.sonsofodin.com"
    },
    "id": "98396",
    "links": {
      "self": "https://api.flowroute.com/routes/98396"
    },
    "type": "route"
  },
  "links": {
    "self": "https://api.flowroute.com/routes/98396"
  }
}
```
#### listInbounRoutes(callback)

The function accepts `limit`, `offset` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-inbound-routes/).

##### Example Request
```node
var limit = 2
accountroutes = routes_controller.listInboundRoutes(limit, callback)
accountroutes.then(function(response) {
  console.log("--List Inbound Routes")
  console.log(response);
}, function(err) {
  console.log(err);
});
```

##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains an array of route objects in JSON format. 

```
{
  "data": [
    {
      "attributes": {
        "route_type": "sip-reg",
        "alias": "sip-reg",
        "value": null
      },
      "type": "route",
      "id": "0",
      "links": {
        "self": "https://api.flowroute.com/v2/routes/0"
      }
    },
    {
      "attributes": {
        "route_type": "number",
        "alias": "PSTNroute1",
        "value": "12065551212"
      },
      "type": "route",
      "id": "83834",
      "links": {
        "self": "https://api.flowroute.com/v2/routes/83834"
      }
    }
  ],
  "links": {
    "self": "https://api.flowroute.com/v2/routes?limit=2&offset=0",
    "next": "https://api.flowroute.com/v2/routes?limit=2&offset=2"
  }
}
```

#### updatePrimaryVoiceRouteForAPhoneNumber(numberId, routeBody, callback)

The function accepts a phone number `id`, a route record object in JSON format, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/update-number-primary-voice-route/). 

##### Example Request
```node

console.log("---Update Primary Voice Route")
```

##### Example Response

On success, the HTTP status code in the response header is `204 No Content` which means that the server successfully processed the request and is not returning any content.

`204: No Content`


#### updateFailoverVoiceRouteForAPhoneNumber(numberId, routeBody, callback)

The function accepts a phone number `id`, a route record object in JSON format, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/update-number-failover-voice-route/). 

##### Example Request
```node
console.log("---Update Failover Voice Route")
```

##### Example Response

On success, the HTTP status code in the response header is `204 No Content` which means that the server successfully processed the request and is not returning any content.

`204: No Content`


### Messaging
The Flowroute Node.js library v3 allows you to make HTTP requests to the `messages` resource of Flowroute API v2.1: `https://api.flowroute.com/v2.1/messages`

#### sendAMessage(messageBody, callback)

The function accepts a message object in JSON format and `callback` as parameters which you can learn more about in the API References for [MMS](https://developer.flowroute.com/api/messages/v2.1/send-an-mms/) and [SMS](https://developer.flowroute.com/api/messages/v2.1/send-an-sms/). In the following example, we are sending an MMS with a `gif` attachment from the previously declared `number_id` to your mobile number. 

##### Example Request
```node
console.log ("---Send A Message")
pprint.pprint(result)
```
Note that this function call is currently commented out. Uncomment to test the `send_a_message` function.

##### Example Response

On success, the HTTP status code in the response header is `202 Accepted` and the response body contains the message record ID with `mdr2` prefix.

```
{
  "data": {
    "links": {
      "self": "https://api.flowroute.com/v2.1/messages/mdr2-39cadeace66e11e7aff806cd7f24ba2d"
    },
    "type": "message",
    "id": "mdr2-39cadeace66e11e7aff806cd7f24ba2d"
  }
}
```


#### lookUpASetofMessages(startDate, callback)

The function accepts `start_date`, `end_date`, `limit`, `offset`, and `callback` as parameters which you can learn more about in the [API Reference](https://developer.flowroute.com/api/messages/v2.1/look-up-set-of-messages/).

##### Example Request
```node
var start_date = "2018-01-01"
var end_date = "2018-01-31"
accountmessages = messages_controller.lookUpASetOfMessages(start_date, end_date, limit, callback)
accountmessages.then(function(response) {
  console.log("--Look Up a Set of Messages")
  console.log(response);
}, function(err) {
  console.log(err);
});
```

##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains an array of message objects in JSON format.

```
{
  "data": [
    {
      "attributes": {
        "body": "Hello are you there? ",
        "status": "delivered",
        "direction": "inbound",
        "amount_nanodollars": 4000000,
        "to": "12012673227",
        "message_encoding": 0,
        "timestamp": "2017-12-22T01:52:39.39Z",
        "delivery_receipts": [],
        "amount_display": "$0.0040",
        "from": "12061231234",
        "is_mms": false,
        "message_type": "longcode"
      },
      "type": "message",
      "id": "mdr2-ca82be46e6ba11e79d08862d092cf73d"
    },
    {
      "attributes": {
        "body": "test sms on v2",
        "status": "message buffered",
        "direction": "outbound",
        "amount_nanodollars": 4000000,
        "to": "12061232634",
        "message_encoding": 0,
        "timestamp": "2017-12-21T16:44:34.93Z",
        "delivery_receipts": [
          {
            "status": "message buffered",
            "status_code": 1003,
            "status_code_description": "Message accepted by Carrier",
            "timestamp": "2017-12-21T16:44:35.00Z",
            "level": 2
          },
          {
            "status": "smsc submit",
            "status_code": null,
            "status_code_description": "Message has been sent",
            "timestamp": "2017-12-21T16:44:35.00Z",
            "level": 1
          }
        ],
        "amount_display": "$0.0040",
        "from": "12012673227",
        "is_mms": false,
        "message_type": "longcode"
      },
      "type": "message",
      "id": "mdr2-39cadeace66e11e7aff806cd7f24ba2d"
    }
  ],
  "links": {
    "next": "https://api.flowroute.com/v2.1/messages?limit=2&start_date=2017-12-01T00%3A00%3A00%2B00%3A00&end_date=2018-01-08T00%3A00%3A00%2B00%3A00&offset=2"
  }
}
```

#### lookUpAMessageDetailRecord(messageId)

The function accepts a message `id` in MDR2 format and `callback` as parameters which you can learn more about in the [API Reference](https://developer.flowroute.com/api/messages/v2.1/look-up-a-message-detail-record/). 
##### Example Request
```node
message_id = result['data'][0]['id']
result = messages_controller.look_up_a_message_detail_record(message_id)
pprint.pprint(result)
```

##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains the message object for our specified message `id`.
```
{
  "data": {
    "attributes": {
      "body": "Hello are you there? ",
      "status": "delivered",
      "direction": "inbound",
      "amount_nanodollars": 4000000,
      "to": "12012673227",
      "message_encoding": 0,
      "timestamp": "2017-12-22T01:52:39.39Z",
      "delivery_receipts": [],
      "amount_display": "$0.0040",
      "from": "12061232634",
      "is_mms": false,
      "message_type": "longcode"
    },
    "type": "message",
    "id": "mdr2-ca82be46e6ba11e79d08862d092cf73d"
  }
}
```

### E911 Address Management
The Flowroute Node.js library v3 allows you to make HTTP requests to the `e911s` resource of Flowroute API v2: `https://api.flowroute.com/v2/e911s`

#### listAccountE911Addresses(options, callback)

The function accepts `limit`, `offset`, `state` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-account-e911-addresses/). 

##### Example Request
```
var e911_addresses = e911s_controller.listAccountE911Addresses(limit=3, offset=null, state="WA", callback);
e911_addresses.then(function(response) {
  console.log("--List Account E911 Addresses")
  console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```

##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains an array of e911 objects in JSON format.

```
--List Account E911 Addresses
{
  "data": [
    {
      "attributes": {
        "address_type": "",
        "address_type_number": "",
        "city": "Seattle",
        "country": "US",
        "first_name": "Death",
        "label": "Funeral Homes",
        "last_name": "Crow",
        "state": "WA",
        "street_name": "Smith St",
        "street_number": "123",
        "zip": "98101"
      },
      "id": "22127",
      "links": {
        "self": "https://api.flowroute.com/v2/e911s/22127"
      },
      "type": "e911"
    },
    {
      "attributes": {
        "address_type": "",
        "address_type_number": "",
        "city": "Seattle",
        "country": "US",
        "first_name": "Jim",
        "label": "Smith Tower",
        "last_name": "Law",
        "state": "WA",
        "street_name": "Smith St",
        "street_number": "123",
        "zip": "98101"
      },
      "id": "22124",
      "links": {
        "self": "https://api.flowroute.com/v2/e911s/22124"
      },
      "type": "e911"
    },
    {
      "attributes": {
        "address_type": "",
        "address_type_number": "",
        "city": "Seattle",
        "country": "US",
        "first_name": "Bob",
        "label": "First e911 record",
        "last_name": "Law",
        "state": "WA",
        "street_name": "Smith St",
        "street_number": "123",
        "zip": "98101"
      },
      "id": "22120",
      "links": {
        "self": "https://api.flowroute.com/v2/e911s/22120"
      },
      "type": "e911"
    }
  ],
  "links": {
    "next": "https://api.flowroute.com/v2/e911s?state=WA&limit=3&offset=3",
    "self": "https://api.flowroute.com/v2/e911s?state=WA&limit=3&offset=0"
  }
}
```
#### listE911RecordDetails(e911ID, callback) 

The function accepts an `e911_id` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-e911-record-details/). The value that gets assigned to `e911_id` is the first resulting item of the returned array from the `listAccountE911Addresses` function call.

##### Example Request
```
var e911_address_details = e911s_controller.listE911RecordDetails(21845, callback);
e911_address_details.then(function(response) {
  console.log("--List E911 Record Details")
  console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```
##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains a detailed e911 object in JSON format. 

```
--List E911 Record Details
{
  "data": {
    "attributes": {
      "address_type": "Suite",
      "address_type_number": "333",
      "city": "Seattle",
      "country": "US",
      "first_name": "Albus",
      "label": "Office Space III",
      "last_name": "Rasputin, Jr.",
      "state": "WA",
      "street_name": "Main St",
      "street_number": "666",
      "zip": "98101"
    },
    "id": "21845",
    "links": {
      "self": "https://api.flowroute.com/v2/e911s/21845"
    },
    "type": "e911"
  }
}
```

#### createValidateAnE911Address(e911Address, callback) 

In the following example request, we instantiate `e911address` as an `E911Address` JSON body, directly initializing its different data attributes with example values. An `E911Address` object can have `label`, `first_name`, `last_name`, `street_name`, `street_number`, `address_type`, `address_type_number`, `city`, `state`, `country`, and `zipcode`. Learn more about the different body parameters in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/validate-e911-address/). We then pass `e911address` as a parameter for the `createValidateAnE911Address` function.

    
##### Example Request
```
var e911address = {"data":{"type": "e911", "attributes":{"label":"Belfry Oddities II", "first_name": "Jim", "last_name": "Law", "street_number": "123", "street_name": "Smith St", "address_type":"Apartment", "address_type_number": "666", "city": "Seattle", "state": "WA", "country": "US", "zip": "98101"}}};
var validate_address = e911s_controller.createValidateAnE911Address(e911address, callback);
validate_address.then(function(response) {
  console.log("--Validate an E911 Address")
  console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```

##### Example Response

On success, the HTTP status code in the response header is `204 No Content` which means that the server successfully processed the request and is not returning any content. On error, a printable representation of the detailed API response is displayed.

```
["rawBody":"FlowrouteNumbersAndMessagingLib\Http\HttpResponse":private]=>
  string(171)
"{
  "errors": [
    {
      "detail": {
        "data": {
          "attributes": {
            "zip": [
              "ZIP code must be at least 4 and at most 7 digits long"
            ]
          }
        }
      },
      "id": "15eb464e-d717-49e2-a6cc-e97af67c1930",
      "status": 422
    }
  ]
}
"
```
#### createAndValidateANewE911Address(e911address, callback)

The function accepts an E911 object with its different attributes as a parameter. Learn more about the different E911 attributes in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/create-and-validate-new-e911-address/). In the following example request, we pass our previously validated `E911Address` JSON data, `e911address`, as a parameter to the `createAndValidateANewE911Address` function.
    
##### Example Request
```
var create_address = e911s_controller.createAndValidateANewE911Address(e911address, callback);
create_address.then(function(response) {
  console.log("--Create and Validate an E911 Address")
  console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```

##### Example Response

On success, the HTTP status code in the response header is `201 Created` and the response body contains the newly created e911 object in JSON format. On error, a printable representation of the detailed API response is displayed.

```
--Create and Validate an E911 Address
{
  "data": {
    "attributes": {
      "address_type": "Apartment",
      "address_type_number": "666",
      "city": "Seattle",
      "country": "US",
      "first_name": "Jim",
      "label": "Belfry Oddities II",
      "last_name": "Law",
      "state": "WA",
      "street_name": "Smith St",
      "street_number": "123",
      "zip": "98101"
    },
    "id": "21907",
    "links": {
      "self": "https://api.flowroute.com/v2/e911s/21907"
    },
    "type": "e911"
  }
}
```
#### updateAndValidateAnExistingE911Address(e911Id, e911Address, callback)

The function accepts an `e911_address`, an `e911_id`, and `callback` as parameters. Learn more about the different E911 attributes that you can update in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/update-and-validate-existing-e911-address/). In the following example, we will retrieve the record of our previously declared e911 ID. We then update the `label` of our selected E911 address to "Funeral Homes".
    
##### Example Request
```
var updatedaddress = {"data":{"type": "e911", "attributes":{"label": "Funeral Homes"}}};
var update_address = e911s_controller.updateAndValidateAnExistingE911Address(22127, updatedaddress, callback)
update_address.then(function(response) {
  console.log("--Update and Validate an E911 Address")
  console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```
##### Example Response
On success, the HTTP status code in the response header is `200 OK` and the response body contains the newly updated e911 object in JSON format. On error, a printable representation of the detailed API response is displayed.

```
{
  "data": {
    "attributes": {
      "address_type": "Apartment",
      "address_type_number": "666",
      "city": "Seattle",
      "country": "US",
      "first_name": "Jim",
      "label": "Funeral Homes",
      "last_name": "Law",
      "state": "WA",
      "street_name": "Smith St",
      "street_number": "123",
      "zip": "98101"
    },
    "id": "21907",
    "links": {
      "self": "https://api.flowroute.com/v2/e911s/21907"
    },
    "type": "e911"
  }
}
```

#### updateAssignAValidE911AddressToYourPhoneNumber(numberId, e911Id, callback)

The function accepts `number_id`, e911_id`, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/assign-valid-e911-address-to-phone-number/). In the following example, replace the phone number ID with your Flowroute phone number, pass our previously declared e911 ID, and then make the association between them.
    
##### Example Request
```
var e911_number_association = e911s_controller.updateAssignAValidE911AddressToYourPhoneNumber(numberId=12065014286, 21907, callback)
e911_number_association.then(function(response) {
console.log("--Assign An E911 Address to a Phone Number")
  console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```
##### Example Response

On success, the HTTP status code in the response header is `204 No Content` which means that the server successfully processed the request and is not returning any content.

```
Assign an E911 Address to a Phone Number
204 No Content
```

#### listPhoneNumbersWithE911Record(e911Id, callback) 

The function accepts `e911_id` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-phone-numbers-associated-with-e911-record/). In the following example, we retrieve the list of phone numbers associated with our previously declared E911 ID.
    
##### Example Request
```
var e911_numbers = e911s_controller.listPhoneNumbersWithE911Record(21907, callback);
e911_numbers.then(function(response) {
    console.log("--List Phone Numbers Associated with an E911 Record")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```
##### Example Response
On success, the HTTP status code in the response header is `200 OK` and the response body contains an array of related number objects in JSON format.
```
--List Phone Numbers Associated with an E911 Record
{
  "data": [
    {
      "attributes": {
        "alias": null,
        "value": "12062011682"
      },
      "id": "12062011682",
      "links": {
        "self": "https://api.flowroute.com/v2/numbers/12062011682"
      },
      "type": "number"
    }
  ],
  "links": {
    "self": "https://api.flowroute.com/v2/e911s/21907/relationships/numbers?limit=10&offset=0"
  }
}
```
#### deleteDeactivateE911ServiceForYourPhoneNumber(numberId, callback) 

The function accepts `number_id` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/deactivate-e911-service-for-phone-number/). In the following example, we deactivate the E911 service for our previously assigned phone number ID.

##### Example Request
```
var deactivate_e911 = e911s_controller.deleteDeactivateE911ServiceForYourPhoneNumber(numberId=12062011682, callback)
deactivate_e911.then(function(response) {
    console.log("--Deactivate E911 Service for a Phone Number")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```
##### Example Response
On success, the HTTP status code in the response header is `204 No Content` which means that the server successfully processed the request and is not returning any content.

```
--Deactivate E911 Service for a Phone Number
204 No Content
```
#### removeAnE911AddressFromYourAccount(e911Id, callback) 

The function accepts `e911_id` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/remove-e911-address-from-account/). Note that all phone number associations must be removed first before you are able to delete the specified E911 ID. In the following example, we will attempt to delete the previously assigned E911 ID.

##### Example Request
```
var delete_e911 = e911s_controller.removeAnE911AddressFromYourAccount(numberId=12062011682, callback)
delete_e911.then(function(response) {
    console.log("--Delete E911 Record")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```

##### Example Response
On success, the HTTP status code in the response header is `204 No Content` which means that the server successfully processed the request and is not returning any content.

```
--Delete E911 Record
204 No Content
```

### CNAM Record Management

The Flowroute Node.js Library v3 allows you to make HTTP requests to the `cnams` resource of Flowroute API v2: `https://api.flowroute.com/v2/cnams`.

All of the CNAM record management functions are encapsulated in `cnam_demo.js`.

| API Reference Pages |
| ------------------- |
| The E911 and CNAM API reference pages are currently restricted to our beta customers, which means that all API reference links below currently return a `404 Not Found`. They will be publicly available during our E911 and CNAM APIs GA launch in a few weeks. |

#### listAccountCNAMRecords(options, callback) 

The function accepts a callback function and all the different CNAM query parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-account-cnam-records/). In the following example request, we will only retrieve 3 approved CNAM records. 
    
##### Example Request
```
var account_cnams = cnams_controller.listAccountCNAMRecords(limit=3, offset=null, isApproved=true, callback);
account_cnams.then(function(response) {
    console.log("--List Approved CNAM Records")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```
##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains an array of cnam objects in JSON format.

```
--List Approved CNAM Records
{
  "data": [
    {
      "attributes": {
        "approval_datetime": "2018-04-23 17:04:30.829341+00:00",
        "creation_datetime": "2018-04-19 21:03:04.932192+00:00",
        "is_approved": true,
        "rejection_reason": null,
        "value": "BROWN BAG"
      },
      "id": "22790",
      "links": {
        "self": "https://api.flowroute.com/v2/cnams/22790"
      },
      "type": "cnam"
    },
    {
      "attributes": {
        "approval_datetime": "2018-05-23 18:58:46.052602+00:00",
        "creation_datetime": "2018-05-22 23:38:27.794911+00:00",
        "is_approved": true,
        "rejection_reason": null,
        "value": "LEATHER REBEL"
      },
      "id": "23221",
      "links": {
        "self": "https://api.flowroute.com/v2/cnams/23221"
      },
      "type": "cnam"
    },
    {
      "attributes": {
        "approval_datetime": "2018-05-23 18:58:46.052602+00:00",
        "creation_datetime": "2018-05-22 23:42:00.786818+00:00",
        "is_approved": true,
        "rejection_reason": null,
        "value": "MORBO"
      },
      "id": "23224",
      "links": {
        "self": "https://api.flowroute.com/v2/cnams/23224"
      },
      "type": "cnam"
    }
  ],
  "links": {
    "next": "https://api.flowroute.com/v2/cnams?is_approved=True&limit=3&offset=3",
    "self": "https://api.flowroute.com/v2/cnams?is_approved=True&limit=3&offset=0"
  }
}
```
#### listCNAMRecordDetails(cnamId, callback)

The function accepts a CNAM record ID and a callback function as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-cnam-record-details/). In the following example, we assign the ID of the first record returned from our previous API query and retrieve the details of that specific CNAM record. 
    
##### Example Request
```
var cnam_details = cnams_controller.listCNAMRecordDetails(22790, callback)
cnam_details.then(function(response) {
    console.log("--List CNAM Record Details")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```
##### Example Response

On success, the HTTP status code in the response header is `200 OK` and the response body contains a detailed cnam object in JSON format.

```
--List CNAM Record Details
{
  "data": {
    "attributes": {
      "approval_datetime": "2018-04-23 17:04:30.829341+00:00",
      "creation_datetime": "2018-04-19 21:03:04.932192+00:00",
      "is_approved": true,
      "rejection_reason": null,
      "value": "BROWN BAG"
    },
    "id": "22790",
    "links": {
      "self": "https://api.flowroute.com/v2/cnams/22790"
    },
    "relationships": {
      "numbers": {
        "data": []
      }
    },
    "type": "cnam"
  }
}
```
#### createANewCNAMRecord(body, mContentType, callback)

The function accepts a Caller ID value, content type of `application/vnd.api+json`, and a callback function as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/create-a-new-cnam-record/). Note that you can enter up to 15 characters for your CNAM value.
    
##### Example Request
```
var new_cnam = { "value":"Heartwood" };
var create_cnam = cnams_controller.createANewCNAMRecord(new_cnam, mContentType="application/vnd.api+json", callback);
create_cnam.then(function(response) {
    console.log("--Create a CNAM Record")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```

##### Example Response

On success, the HTTP status code in the response header is `201 Created` and the response body contains the newly created cnam object in JSON format. Note that CNAM records take up to 48 hours to be approved on your account and further association with a phone number takes 5-7 business days.

```
--Create a CNAM Record
{
  "data": {
    "attributes": {
      "approval_datetime": null,
      "creation_datetime": "2018-07-10 23:14:28.529156+00:00",
      "is_approved": false,
      "rejection_reason": null,
      "value": "HEARTWOOD"
    },
    "id": "24141",
    "links": {
      "self": "https://api.flowroute.com/v2/cnams/24141"
    },
    "type": "cnam"
  }
}
```
#### updateAssignACNAMRecordToYourPhoneNumber(numberId, cnamId, callback) 

The function accepts a callback function, a CNAM record ID, and a phone number as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/assign-cnam-record-to-phone-number/). In the following example, we will associate our previously used phone number, `12062011682`, with our known approved CNAM record, `22790`.
    
##### Example Request
```
var associate_cnam = cnams_controller.updateAssignACNAMRecordToYourPhoneNumber(numberID=12062011682, cnamID=22790, callback);
associate_cnam.then(function(response) {
    console.log("--Associate a CNAM Record with a Phone Number")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```

##### Example Response
On success, the HTTP status code in the response header is `202 Accepted` and the response body contains an attributes dictionary containing the `date_created` field and the assigned cnam object in JSON format. This request will fail if the CNAM you are trying to associate has not yet been approved.
```
--Associate a CNAM Record with a Phone Number
{'data': {'attributes': {'date_created': 'Fri, 01 Jun 2018 00:17:52 GMT'},
          'id': 22790,
          'type': 'cnam'}}
```
#### deleteUnassignACNAMRecordFromYourPhoneNumber(numberId, callback) 

The function accepts a callback function and a phone number as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/unassign-a-cnam-record-from-phone-number/). In the following example, we will disassociate the same phone number that we've used in `updateAssignACNAMRecordToYourPhoneNumber()`. 
    
##### Example Request
```
var disassociate_cnam = cnams_controller.deleteUnassignACNAMRecordFromYourPhoneNumber(12065014286, callback)
disassociate_cnam.then(function(response) {
    console.log("--Unassign a CNAM Record from a Phone Number")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```
##### Example Response
On success, the HTTP status code in the response header is `202 Accepted` and the response body contains an attributes object with the date the CNAM was requested to be deleted, and the updated cnam object in JSON format. 

```
--Unassign a CNAM Record from a Phone Number
{
  "data": {
    "attributes": {
      "date_created": "Tue, 10 Jul 2018 23:48:50 GMT"
    },
    "id": null,
    "type": "cnam"
  }
}
```
#### deleteACNAMRecord(cnamId, callback)

The function accepts a callback function and a CNAM record ID as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/remove-cnam-record-from-account/). In the following example, we will be deleting our previously assigned `cnam_id` from the last function call. 
    
##### Example Request
```
var delete_cnam = cnams_controller.deleteACNAMRecord(22790, callback)
delete_cnam.then(function(response) {
    console.log("--Delete a CNAM Record")
    console.log(JSON.stringify(response, null, 2));
}, function(err) {
  console.log(err);
});
```
##### Example Response
On success, the HTTP status code in the response header is `204 No Content` which means that the server successfully processed the request and is not returning any content.

```
--Delete a CNAM Record
204 No Content
```

#### Errors

In cases of function errors, the Node.js library raises an exception which includes an error message, and the HTTP body that was received in the request. 

##### Example Error
```shell
raise ErrorException('Forbidden – The server understood the request but refuses to authorize it.', _context)
```

#### Testing

Once you are done configuring your Flowroute API credentials and updating the function parameters, you can run any of the demo files to see them in action. The Flowroute library demo files are named after the resource they represent: &lt;resource_name&gt;_demo.js.

`node cnam_demo.js`
