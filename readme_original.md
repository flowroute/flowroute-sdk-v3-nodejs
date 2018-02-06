# Getting started

The Flowroute APIs are organized around REST. Our APIs have resource-oriented URLs, support HTTP Verbs, and respond with HTTP Status Codes. All API requests and responses, including errors, will be represented as JSON objects. You can use the Flowroute APIs to manage your Flowroute phone numbers including setting primary and failover routes for inbound calls, and sending text messages (SMS and MMS) using long-code or toll-free numbers in your account.

## How to Build

The generated SDK relies on [Node Package Manager](https://www.npmjs.com/) (NPM) being available to resolve dependencies. If you don't already have NPM installed, please go ahead and follow instructions to install NPM from [here](https://nodejs.org/en/download/).
The SDK also requires Node to be installed. If Node isn't already installed, please install it from [here](https://nodejs.org/en/download/)
> NPM is installed by default when Node is installed

To check if node and npm have been successfully installed, write the following commands in command prompt:

* `node --version`
* `npm -version`

![Version Check](https://apidocs.io/illustration/nodejs?step=versionCheck&workspaceFolder=Flowroute%20Numbers%20and%20Messaging-Node)

Now use npm to resolve all dependencies by running the following command in the root directory (of the SDK folder):

```bash
npm install
```

![Resolve Dependencies](https://apidocs.io/illustration/nodejs?step=resolveDependency1&workspaceFolder=Flowroute%20Numbers%20and%20Messaging-Node)

![Resolve Dependencies](https://apidocs.io/illustration/nodejs?step=resolveDependency2)

This will install all dependencies in the `node_modules` folder.

Once dependencies are resolved, you will need to move the folder `FlowrouteNumbersAndMessagingLib ` in to your `node_modules` folder.

## How to Use

The following section explains how to use the library in a new project.

### 1. Open Project Folder
Open an IDE/Text Editor for JavaScript like Sublime Text. The basic workflow presented here is also applicable if you prefer using a different editor or IDE.

Click on `File` and select `Open Folder`.

![Open Folder](https://apidocs.io/illustration/nodejs?step=openFolder)

Select the folder of your SDK and click on `Select Folder` to open it up in Sublime Text. The folder will become visible in the bar on the left.

![Open Project](https://apidocs.io/illustration/nodejs?step=openProject&workspaceFolder=Flowroute%20Numbers%20and%20Messaging-Node)

### 2. Creating a Test File

Now right click on the folder name and select the `New File` option to create a new test file. Save it as `index.js` Now import the generated NodeJS library using the following lines of code:

```js
var lib = require('lib');
```

Save changes.

![Create new file](https://apidocs.io/illustration/nodejs?step=createNewFile&workspaceFolder=Flowroute%20Numbers%20and%20Messaging-Node)

![Save new file](https://apidocs.io/illustration/nodejs?step=saveNewFile&workspaceFolder=Flowroute%20Numbers%20and%20Messaging-Node)

### 3. Running The Test File

To run the `index.js` file, open up the command prompt and navigate to the Path where the SDK folder resides. Type the following command to run the file:

```
node index.js
```

![Run file](https://apidocs.io/illustration/nodejs?step=runProject&workspaceFolder=Flowroute%20Numbers%20and%20Messaging-Node)


## How to Test

These tests use Mocha framework for testing, coupled with Chai for assertions. These dependencies need to be installed for tests to run.
Tests can be run in a number of ways:

### Method 1 (Run all tests)

1. Navigate to the root directory of the SDK folder from command prompt.
2. Type `mocha --recursive` to run all the tests.

### Method 2 (Run all tests)

1. Navigate to the `../test/Controllers/` directory from command prompt.
2. Type `mocha *` to run all the tests.

### Method 3 (Run specific controller's tests)

1. Navigate to the `../test/Controllers/` directory from command prompt.
2. Type `mocha  Flowroute Numbers and MessagingController`  to run all the tests in that controller file.

> To increase mocha's default timeout, you can change the `TEST_TIMEOUT` parameter's value in `TestBootstrap.js`.

![Run Tests](https://apidocs.io/illustration/nodejs?step=runTests&controllerName=Flowroute%20Numbers%20and%20MessagingController)

## Initialization

### Authentication
In order to setup authentication in the API client, you need the following information.

| Parameter | Description |
|-----------|-------------|
| basicAuthUserName | The username to use with basic authentication |
| basicAuthPassword | The password to use with basic authentication |



API client can be initialized as following:

```JavaScript
const lib = require('lib');

// Configuration parameters and credentials
lib.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
lib.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

```



# Class Reference

## <a name="list_of_controllers"></a>List of Controllers

* [MessagesController](#messages_controller)
* [NumbersController](#numbers_controller)
* [RoutesController](#routes_controller)

## <a name="messages_controller"></a>![Class: ](https://apidocs.io/img/class.png ".MessagesController") MessagesController

### Get singleton instance

The singleton instance of the ``` MessagesController ``` class can be accessed from the API Client.

```javascript
var controller = lib.MessagesController;
```

### <a name="get_look_up_a_set_of_messages"></a>![Method: ](https://apidocs.io/img/method.png ".MessagesController.getLookUpASetOfMessages") getLookUpASetOfMessages

> Retrieves a list of Message Detail Records (MDRs) within a specified date range. Date and time is based on Coordinated Universal Time (UTC).


```javascript
function getLookUpASetOfMessages(startDate, endDate, limit, offset, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| startDate |  ``` Required ```  | The beginning date and time, in UTC, on which to perform an MDR search. The DateTime can be formatted as YYYY-MM-DDor YYYY-MM-DDTHH:mm:ss.SSZ. |
| endDate |  ``` Optional ```  | The ending date and time, in UTC, on which to perform an MDR search. The DateTime can be formatted as YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.SSZ. |
| limit |  ``` Optional ```  | The number of MDRs to retrieve at one time. You can set as high of a number as you want, but the number cannot be negative and must be greater than 0 (zero). |
| offset |  ``` Optional ```  | The number of MDRs to skip when performing a query. The number must be 0 (zero) or greater, but cannot be negative. |



#### Example Usage

```javascript

    var startDate = date("D M d, Y G:i");
    var endDate = date("D M d, Y G:i");
    var limit = 157;
    var offset = 157;

    controller.getLookUpASetOfMessages(startDate, endDate, limit, offset, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




### <a name="create_send_a_message"></a>![Method: ](https://apidocs.io/img/method.png ".MessagesController.createSendAMessage") createSendAMessage

> Sends an SMS or MMS from a Flowroute long code or toll-free phone number to another valid phone number.


```javascript
function createSendAMessage(body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | The SMS or MMS message to send. |



#### Example Usage

```javascript

    var body = new Message({"key":"value"});

    controller.createSendAMessage(body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 403 | Forbidden – You don't have permission to access this resource. |
| 404 | The specified resource was not found |
| 422 | Unprocessable Entity - You tried to enter an incorrect value. |




### <a name="get_look_up_a_message_detail_record"></a>![Method: ](https://apidocs.io/img/method.png ".MessagesController.getLookUpAMessageDetailRecord") getLookUpAMessageDetailRecord

> Searches for a specific message record ID and returns a Message Detail Record (in MDR2 format).


```javascript
function getLookUpAMessageDetailRecord(id, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | The unique message detail record identifier (MDR ID) of any message. When entering the MDR ID, the number should include the mdr2- preface. |



#### Example Usage

```javascript

    var id = 'id';

    controller.getLookUpAMessageDetailRecord(id, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




[Back to List of Controllers](#list_of_controllers)

## <a name="numbers_controller"></a>![Class: ](https://apidocs.io/img/class.png ".NumbersController") NumbersController

### Get singleton instance

The singleton instance of the ``` NumbersController ``` class can be accessed from the API Client.

```javascript
var controller = lib.NumbersController;
```

### <a name="get_account_phone_numbers"></a>![Method: ](https://apidocs.io/img/method.png ".NumbersController.getAccountPhoneNumbers") getAccountPhoneNumbers

> Returns a list of all phone numbers currently on your Flowroute account. The response includes details such as the phone number's rate center, state, number type, and whether CNAM Lookup is enabled for that number.


```javascript
function getAccountPhoneNumbers(startsWith, endsWith, contains, limit, offset, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| startsWith |  ``` Optional ```  | Retrieves phone numbers that start with the specified value. |
| endsWith |  ``` Optional ```  | Retrieves phone numbers that end with the specified value. |
| contains |  ``` Optional ```  | Retrieves phone numbers containing the specified value. |
| limit |  ``` Optional ```  | Limits the number of items to retrieve. A maximum of 200 items can be retrieved. |
| offset |  ``` Optional ```  | Offsets the list of phone numbers by your specified value. For example, if you have 4 phone numbers and you entered 1 as your offset value, then only 3 of your phone numbers will be displayed in the response. |



#### Example Usage

```javascript

    var startsWith = 157;
    var endsWith = 157;
    var contains = 157;
    var limit = 157;
    var offset = 157;

    controller.getAccountPhoneNumbers(startsWith, endsWith, contains, limit, offset, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




### <a name="get_phone_number_details"></a>![Method: ](https://apidocs.io/img/method.png ".NumbersController.getPhoneNumberDetails") getPhoneNumberDetails

> Lists all of the information associated with any of the phone numbers in your account, including billing method, primary voice route, and failover voice route.


```javascript
function getPhoneNumberDetails(id, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | Phone number to search for which must be a number that you own. Must be in 11-digit E.164 format; e.g. 12061231234. |



#### Example Usage

```javascript

    var id = 157;

    controller.getPhoneNumberDetails(id, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized |
| 404 | Not Found |




### <a name="create_purchase_a_phone_number"></a>![Method: ](https://apidocs.io/img/method.png ".NumbersController.createPurchaseAPhoneNumber") createPurchaseAPhoneNumber

> Lets you purchase a phone number from available Flowroute inventory.


```javascript
function createPurchaseAPhoneNumber(id, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | Phone number to purchase. Must be in 11-digit E.164 format; e.g. 12061231234. |



#### Example Usage

```javascript

    var id = 157;

    controller.createPurchaseAPhoneNumber(id, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




### <a name="search_for_purchasable_phone_numbers"></a>![Method: ](https://apidocs.io/img/method.png ".NumbersController.searchForPurchasablePhoneNumbers") searchForPurchasablePhoneNumbers

> This endpoint lets you search for phone numbers by state or rate center, or by your specified search value.


```javascript
function searchForPurchasablePhoneNumbers(startsWith, contains, endsWith, limit, offset, rateCenter, state, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| startsWith |  ``` Optional ```  | Retrieve phone numbers that start with the specified value. |
| contains |  ``` Optional ```  | Retrieve phone numbers containing the specified value. |
| endsWith |  ``` Optional ```  | Retrieve phone numbers that end with the specified value. |
| limit |  ``` Optional ```  | Limits the number of items to retrieve. A maximum of 200 items can be retrieved. |
| offset |  ``` Optional ```  | Offsets the list of phone numbers by your specified value. For example, if you have 4 phone numbers and you entered 1 as your offset value, then only 3 of your phone numbers will be displayed in the response. |
| rateCenter |  ``` Optional ```  | Filters by and displays phone numbers in the specified rate center. |
| state |  ``` Optional ```  | Filters by and displays phone numbers in the specified state. Optional unless a ratecenter is specified. |



#### Example Usage

```javascript

    var startsWith = 157;
    var contains = 157;
    var endsWith = 157;
    var limit = 157;
    var offset = 157;
    var rateCenter = rate_center;
    var state = 'state';

    controller.searchForPurchasablePhoneNumbers(startsWith, contains, endsWith, limit, offset, rateCenter, state, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




### <a name="list_available_area_codes"></a>![Method: ](https://apidocs.io/img/method.png ".NumbersController.listAvailableAreaCodes") listAvailableAreaCodes

> Returns a list of all Numbering Plan Area (NPA) codes containing purchasable phone numbers.


```javascript
function listAvailableAreaCodes(limit, offset, maxSetupCost, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| limit |  ``` Optional ```  | Limits the number of items to retrieve. A maximum of 400 items can be retrieved. |
| offset |  ``` Optional ```  | Offsets the list of phone numbers by your specified value. For example, if you have 4 phone numbers and you entered 1 as your offset value, then only 3 of your phone numbers will be displayed in the response. |
| maxSetupCost |  ``` Optional ```  | Restricts the results to the specified maximum non-recurring setup cost. |



#### Example Usage

```javascript

    var limit = 157;
    var offset = 157;
    var maxSetupCost = 157.245120074248;

    controller.listAvailableAreaCodes(limit, offset, maxSetupCost, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




### <a name="list_available_exchange_codes"></a>![Method: ](https://apidocs.io/img/method.png ".NumbersController.listAvailableExchangeCodes") listAvailableExchangeCodes

> Returns a list of all Central Office (exchange) codes containing purchasable phone numbers.


```javascript
function listAvailableExchangeCodes(limit, offset, maxSetupCost, areacode, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| limit |  ``` Optional ```  | Limits the number of items to retrieve. A maximum of 200 items can be retrieved. |
| offset |  ``` Optional ```  | Offsets the list of phone numbers by your specified value. For example, if you have 4 phone numbers and you entered 1 as your offset value, then only 3 of your phone numbers will be displayed in the response. |
| maxSetupCost |  ``` Optional ```  | Restricts the results to the specified maximum non-recurring setup cost. |
| areacode |  ``` Optional ```  | Restricts the results to the specified area code. |



#### Example Usage

```javascript

    var limit = 157;
    var offset = 157;
    var maxSetupCost = 157.245120074248;
    var areacode = 157;

    controller.listAvailableExchangeCodes(limit, offset, maxSetupCost, areacode, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




[Back to List of Controllers](#list_of_controllers)

## <a name="routes_controller"></a>![Class: ](https://apidocs.io/img/class.png ".RoutesController") RoutesController

### Get singleton instance

The singleton instance of the ``` RoutesController ``` class can be accessed from the API Client.

```javascript
var controller = lib.RoutesController;
```

### <a name="list_inbound_routes"></a>![Method: ](https://apidocs.io/img/method.png ".RoutesController.listInboundRoutes") listInboundRoutes

> Returns a list of your inbound routes. From the list, you can then select routes to use as the primary and failover routes for a phone number, which you can do via "Update Primary Voice Route for a Phone Number" and "Update Failover Voice Route for a Phone Number".


```javascript
function listInboundRoutes(limit, offset, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| limit |  ``` Optional ```  | Limits the number of routes to retrieve. A maximum of 200 items can be retrieved. |
| offset |  ``` Optional ```  | Offsets the list of routes by your specified value. For example, if you have 4 inbound routes and you entered 1 as your offset value, then only 3 of your routes will be displayed in the response. |



#### Example Usage

```javascript

    var limit = 157;
    var offset = 157;

    controller.listInboundRoutes(limit, offset, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized |
| 404 | Not Found |




### <a name="create_an_inbound_route"></a>![Method: ](https://apidocs.io/img/method.png ".RoutesController.createAnInboundRoute") createAnInboundRoute

> Creates a new inbound route which can then be associated with phone numbers. Please see "List Inbound Routes" to review the route values that you can associate with your Flowroute phone numbers.


```javascript
function createAnInboundRoute(body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | The new inbound route to be created. |



#### Example Usage

```javascript

    var body = new NewRoute({"key":"value"});

    controller.createAnInboundRoute(body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




### <a name="update_primary_voice_route_for_a_phone_number"></a>![Method: ](https://apidocs.io/img/method.png ".RoutesController.updatePrimaryVoiceRouteForAPhoneNumber") updatePrimaryVoiceRouteForAPhoneNumber

> Use this endpoint to update the primary voice route for a phone number. You must create the route first by following "Create an Inbound Route". You can then assign the created route by specifying its value in a PATCH request.


```javascript
function updatePrimaryVoiceRouteForAPhoneNumber(numberId, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| numberId |  ``` Required ```  | The phone number in E.164 11-digit North American format to which the primary route for voice will be assigned. |
| body |  ``` Required ```  | The primary route to be assigned. |



#### Example Usage

```javascript

    var numberId = 157;
    var body = ;

    controller.updatePrimaryVoiceRouteForAPhoneNumber(numberId, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




### <a name="update_failover_voice_route_for_a_phone_number"></a>![Method: ](https://apidocs.io/img/method.png ".RoutesController.updateFailoverVoiceRouteForAPhoneNumber") updateFailoverVoiceRouteForAPhoneNumber

> Use this endpoint to update the failover voice route for a phone number. You must create the route first by following "Create an Inbound Route". You can then assign the created route by specifying its value in a PATCH request.


```javascript
function updateFailoverVoiceRouteForAPhoneNumber(numberId, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| numberId |  ``` Required ```  | The phone number in E.164 11-digit North American format to which the failover route for voice will be assigned. |
| body |  ``` Required ```  | The failover route to be assigned. |



#### Example Usage

```javascript

    var numberId = 157;
    var body = ;

    controller.updateFailoverVoiceRouteForAPhoneNumber(numberId, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 401 | Unauthorized – There was an issue with your API credentials. |
| 404 | The specified resource was not found |




[Back to List of Controllers](#list_of_controllers)



