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
const Error1 = require('./Models/Error1');
const Message = require('./Models/Message');
const MDR2 = require('./Models/MDR2');
const Data = require('./Models/Data');
const Attributes = require('./Models/Attributes');
const DeliveryReceipt = require('./Models/DeliveryReceipt');
const MessageTypeEnum = require('./Models/MessageTypeEnum');
const Number26 = require('./Models/Number26');
const Data27 = require('./Models/Data27');
const Attributes28 = require('./Models/Attributes28');
const NumberTypeEnum = require('./Models/NumberTypeEnum');
const Links = require('./Models/Links');
const NewRoute = require('./Models/NewRoute');
const Data61 = require('./Models/Data61');
const Attributes62 = require('./Models/Attributes62');
const RouteTypeEnum = require('./Models/RouteTypeEnum');
const AccountRoutes = require('./Models/AccountRoutes');
const Error84 = require('./Models/Error84');
const ErrorException = require('./Exceptions/ErrorException');
const APIException = require('./Exceptions/APIException');


const initializer = {
    // functional components of FlowrouteNumbersAndMessagingLib
    Configuration,
    // controllers of FlowrouteNumbersAndMessagingLib
    MessagesController,
    NumbersController,
    RoutesController,
    // models of FlowrouteNumbersAndMessagingLib
    Error1,
    Message,
    MDR2,
    Data,
    Attributes,
    DeliveryReceipt,
    MessageTypeEnum,
    Number26,
    Data27,
    Attributes28,
    NumberTypeEnum,
    Links,
    NewRoute,
    Data61,
    Attributes62,
    RouteTypeEnum,
    AccountRoutes,
    Error84,
    // exceptions of FlowrouteNumbersAndMessagingLib
    ErrorException,
    APIException,
};

module.exports = initializer;
