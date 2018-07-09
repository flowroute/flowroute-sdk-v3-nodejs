/**
  * @module FlowrouteNumbersAndMessagingLib
  *
  * The Flowroute APIs are organized around REST. Our APIs have resource-oriented URLs, support
  * HTTP Verbs, and respond with HTTP Status Codes. All API requests and responses, including
  * errors, will be represented as JSON objects. You can use the Flowroute APIs to manage your
  * Flowroute phone numbers including setting primary and failover routes for inbound calls, and
  * sending text messages (SMS and MMS) using long-code or toll-free numbers in your account.
  */

'use strict';

const Configuration = require('./configuration');
const MessagesController = require('./Controllers/MessagesController');
const NumbersController = require('./Controllers/NumbersController');
const RoutesController = require('./Controllers/RoutesController');
const E911sController = require('./Controllers/E911sController');
const CnamsController = require('./Controllers/CnamsController');
const APIError = require('./Models/APIError');
const MessageAttributes = require('./Models/MessageAttributes');
const MDR2 = require('./Models/MDR2');
const NumberAttributes = require('./Models/NumberAttributes');
const DeliveryReceipt = require('./Models/DeliveryReceipt');
const MessageTypeEnum = require('./Models/MessageTypeEnum');
const PhoneNumber = require('./Models/PhoneNumber');
const NumberDataobject = require('./Models/NumberDataobject');
const RouteAttributes = require('./Models/RouteAttributes');
const NumberTypeEnum = require('./Models/NumberTypeEnum');
const Links = require('./Models/Links');
const NewRoute = require('./Models/NewRoute');
const RouteDataobject = require('./Models/RouteDataobject');
const RouteTypeEnum = require('./Models/RouteTypeEnum');
const AccountRoutes = require('./Models/AccountRoutes');
const Message = require('./Models/Message');
const CNAM = require('./Models/CNAM');
const MDR2Attributes = require('./Models/MDR2Attributes');
const E911Address = require('./Models/E911Address');
const E911Dataobject = require('./Models/E911Dataobject');
const E911Attributes = require('./Models/E911Attributes');
const APIException = require('./Exceptions/APIException');


const initializer = {
    // functional components of FlowrouteNumbersAndMessagingLib
    Configuration,
    // controllers of FlowrouteNumbersAndMessagingLib
    MessagesController,
    NumbersController,
    RoutesController,
    E911sController,
    CnamsController,
    // models of FlowrouteNumbersAndMessagingLib
    APIError,
    MessageAttributes,
    MDR2,
    NumberAttributes,
    DeliveryReceipt,
    MessageTypeEnum,
    PhoneNumber,
    NumberDataobject,
    RouteAttributes,
    NumberTypeEnum,
    Links,
    NewRoute,
    RouteDataobject,
    RouteTypeEnum,
    AccountRoutes,
    Message,
    CNAM,
    MDR2Attributes,
    E911Address,
    E911Dataobject,
    E911Attributes,
    // exceptions of FlowrouteNumbersAndMessagingLib
    APIException,
};

module.exports = initializer;
