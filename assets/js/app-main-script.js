/// <reference path="../../node_modules/angular/angular.js"/>

import * as routes from './routes.js';
import * as homeController from './controllers/home.js';
import * as homeLinks from './controllers/home-links.js';
import * as sendSMSController from './controllers/send-sms.js';
import * as messagesController from './controllers/messages.js';
import * as profileController from './controllers/profile.js';
import * as addContactsController from './controllers/add-contacts.js';
import * as contactsController from './controllers/contacts.js';
import * as dynamicMessageController from './controllers/dynamic-message.js';
import * as dashboardController from './controllers/dashboard.js';
import * as demoController from './controllers/dashboard.js';

import * as httpService from './services/http.js';
import * as authenticationService from './services/authenticate-user.js';
import * as cookieService from './services/cookie.js';

var app = angular
    .module("RoutesModule", ["ngRoute", "ngCookies"])
    .config(routes)
    .controller("homeLinks", homeLinks)
    .controller("homeController", homeController)
    .controller("sendSMSController", sendSMSController)
    .controller("messagesController", messagesController)
    .controller("profileController", profileController)
    .controller("addContactsController", addContactsController)
    .controller("contactsController", contactsController)
    .controller("dynamicMessageController", dynamicMessageController)
    .controller("dashboardController", dashboardController)
    .controller("demoController", demoController)
    .factory('httpService', httpService)
    .factory('authenticationService', authenticationService)
    .factory('cookieService', cookieService);