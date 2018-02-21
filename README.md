Flowroute Node.js Library v3
=====================

The Flowroute Node.js library v3 provides methods for interacting with [Numbers v2](https://developer.flowroute.com/api/numbers/v2.0/) and [Messages v2.1](https://developer.flowroute.com/api/messages/v2.1/) of the [Flowroute](https://www.flowroute.com) API.

**Topics**

*   [Requirements](#requirements)
*   [Installation](#installation)
*   [Usage](#usage)
    *   [Controllers](#controllers)
        * [Numbers Controller](#numberscontroller)
        * [Routes Controller](#routescontroller)
        * [Messages Controller](#messagescontroller)
    *   [Credentials](#credentials)
    *   [Methods](#methods)
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
In Flowroute's approach to building the Node.js library v3, HTTP requests are handled by controllers named after the API resources they represent: **Numbers**, **Routes**, and **Messages**. These controllers contain the tasks and calllback functions used to perform messaging, number management, and route management within the Node.js library.

## Controllers

### NumbersController

Contains all of the methods necessary to search through Flowroute's phone number inventory, purchase a phone number, and review details of your account phone numbers.

*   [listAvailableAreaCodes(options, callback)](#list_available_area_codes) \- Returns a list of all Numbering Plan Area (NPA) codes containing purchasable phone numbers. All request parameters are optional. If you don't specify a limit, results are limited to the first 10 items.
*   [listAvailableExchangeCodes(options, callback)](#list_available_exchange_codes) \- Returns a list of all Central Office (exchange) codes containing purchasable phone numbers. All request parameters are optional.
*   [searchForPurchasablePhoneNumbers(options, callback)](#search_for_purchasable_phone_numbers) \- Searches for purchasable phone numbers by state or rate center, or by your specified search value.
*   [purchaseAPhoneNumber(numberId, callback)](#purchase_a_phone_numbernumber_id) \- Lets you purchase a phone number from available Flowroute inventory.
*   [getAccountPhoneNumbers(options, callback)](#list_account_phone_numbers) \- Returns a list of all phone numbers currently on your Flowroute account. 
*   [getPhoneNumberDetails(numberId, callback)](#list_phone_number_detailsnumber_id) \- Returns details on a specific phone number associated with your account, including primary voice route, and failover voice route if previously configured.

### RoutesController
    
Contains the methods required to create new inbound routes, view all of your account routes, and update primary and failover voice routes for your phone numbers.
    
*   [createAnInboundRoute(routeBody, callback)](#create_an_inbound_routeroute_body) \- Creates a new inbound route which can then be assigned as either a primary or a failover voice route for a phone number on your account.
*   [listInboundRoutes(options, callback)](#list_inbound_routes) \- Returns a list of your inbound routes. From the list, you can then select routes to use as the primary and failover voice routes for phone numbers on your account.
*   [updatePrimaryVoiceRouteForAPhoneNumber(numberId, routeBody, callback)](#update_primary_voice_routenumber_id-route_body) \- Updates the primary voice route for a phone number. You must create the route first via the `create_an_inbound_route(routebody)` method.
*   [updateFailoverVoiceRouteForAPhoneNumber(numberId, routeBody, callback)](#update_failover_voice_routenumber_id-route_body) \- Updates the failover voice route for a phone number. You must create the route first via the `create_an_inbound_route(routebody)` method.

###   MessagesController
    
Contains the methods required to send an MMS or SMS, and review a specific Message Detail Record (MDR) or a set of messages.
    
*   [sendAMessage(messageBody, callback)](#send_a_messagemessage_body) \- Sends an SMS or MMS from a Flowroute long code or toll-free phone number to another valid phone number.
*   [look\_up\_a\_message\_detail\_record()](#look_up_a_message_detail_recordmessage_id) \- Searches for a specific message record ID and returns a Message Detail Record (in MDR2 format).
*   [lookUpAMessageDetailRecord(messageId, callback)](#look_up_a_set_of_messagesstart_date) \- Retrieves a list of Message Detail Records (MDRs) within a specified date range. Date and time is based on Coordinated Universal Time (UTC).

The following shows an example of a single Node.js file that imports the Flowroute API client and all the required modules. The Node.js library v3 comes with a **demo.js** file that you can edit and run as an example.

```node
#!/usr/bin/env node
require('dotenv').config();
const flowroute = require('./lib');

console.log("Number//Route Management v2 & Messaging v2.1 Demo");

// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.basicAuthUserName = process.env.FR_ACCESS_KEY
flowroute.Configuration.basicAuthPassword = process.env.FR_SECRET_KEY
mobile_number = process.env.MOBILE_NUMBER

// Instantiate API client and create controllers for Numbers, Messages, and Routes
var numbers_controller = flowroute.NumbersController;
var routes_controller = flowroute.RoutesController;
var messages_controller = flowroute.MessagesController;
```    

#### Credentials

In **demo.js**, replace `flowroute.Configuration.basicAuthUserName` with your API Access Key and `flowroute.Configuration.basicAuthUserName` with your API Secret Key from the [Flowroute Manager](https://manage.flowroute.com/accounts/preferences/api/). Note that in our example, we are accessing your Flowroute credentials as environment variables set in a `.env` file. This library should come with a configuration `.env` file that you can modify with your credentials and your mobile number for testing. To learn more about setting environment variables, see [How To Read and Set Environmental and Shell Variables](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps).

```node
// Set up your api credentials and test mobile number for outbound SMS or MMS
flowroute.Configuration.basicAuthUserName = process.env.FR_ACCESS_KEY
flowroute.Configuration.basicAuthPassword = process.env.FR_SECRET_KEY
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
The following section will demonstrate the capabilities of Numbers v2 and Messages v2.1 that are wrapped in our Node.js library. Note that the example responses have been formatted using Mac's `pbpaste` and `jq`. To learn more, see [Quickly Tidy Up JSON from the Command Line](http://onebigfunction.com/vim/2015/02/02/quickly-tidying-up-json-from-the-command-line-and-vim/). 

### Number Management

The Flowroute Node.js library v3  allows you to make HTTP requests to the `numbers` resource of Flowroute API v2: `https://api.flowroute.com/v2/numbers`

#### listAvailableAreaCodes()

The method accepts `limit`, `offset`, `max_setup_cost`, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-available-area-codes/).
    
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

The method accepts `limit`, `offset`, `max_setup_cost`, `areacode`, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-available-exchanges/). 

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

The method accepts `starts_with`, `contains`, `ends_with`, `limit`, `offset`, `rate_center`, `state`, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/search-for-purchasable-phone-numbers/).

##### Example Request
```node
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

The method is used to purchase a telephone number from Flowroute's inventory and accepts the phone number `id` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/purchase-a-phone-number/). In the following example, we assign the `id` of the first phone number in the resulting JSON array as the phone number to be purchased. Note that this function call is currently commented out. Uncomment to test the `purchaseAPhoneNumber` method.
##### Example Request
```node
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

#### getAccountPhoneNumbers()

The method accepts `starts_with`, `ends_with`, `contains`, `limit`, `offset` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-account-phone-numbers/). 
    

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

The method accepts the `numberID` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-phone-number-details/). In the following example, we request the details of the first phone number returned after calling the `list_account_phone_numbers` method.

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

The method accepts the route object in JSON format and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/create-an-inbound-route/). 

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

The method accepts `limit`, `offset` and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/list-inbound-routes/).

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

The method accepts a phone number `id`, a route record object in JSON format, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/update-number-primary-voice-route/). 

##### Example Request
```node

console.log("---Update Primary Voice Route")
```

##### Example Response

On success, the HTTP status code in the response header is `204 No Content` which means that the server successfully processed the request and is not returning any content.

`204: No Content`


#### updateFailoverVoiceRouteForAPhoneNumber(numberId, routeBody, callback)

The method accepts a phone number `id`, a route record object in JSON format, and `callback` as parameters which you can learn more about in the [API reference](https://developer.flowroute.com/api/numbers/v2.0/update-number-failover-voice-route/). 

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

The method accepts a message object in JSON format and `callback` as parameters which you can learn more about in the API References for [MMS](https://developer.flowroute.com/api/messages/v2.1/send-an-mms/) and [SMS](https://developer.flowroute.com/api/messages/v2.1/send-an-sms/). In the following example, we are sending an MMS with a `gif` attachment from the previously declared `number_id` to your mobile number. 

##### Example Request
```node
console.log ("---Send A Message")
pprint.pprint(result)
```
Note that this function call is currently commented out. Uncomment to test the `send_a_message` method.

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

The method accepts `start_date`, `end_date`, `limit`, `offset`, and `callback` as parameters which you can learn more about in the [API Reference](https://developer.flowroute.com/api/messages/v2.1/look-up-set-of-messages/).

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

The method accepts a message `id` in MDR2 format and `callback` as parameters which you can learn more about in the [API Reference](https://developer.flowroute.com/api/messages/v2.1/look-up-a-message-detail-record/). 
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
#### Errors

In cases of method errors, the Node.js library raises an exception which includes the HTTP Response code, an error message, and the HTTP body that was received in the request. 

##### Example Error
```
raise ErrorException('403 Forbidden – The server understood the request but refuses to authorize it.', _context)
```
  
