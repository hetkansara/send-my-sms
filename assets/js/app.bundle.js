/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
    selectAll: function (value){
        $('.'+value).prop('checked',$('#'+value).is(":checked"));
    },
    exportToExcel: function (element){
        var data_type = 'data:application/vnd.ms-excel';
        var table_div = document.getElementById(element);
        var table_html = table_div.outerHTML.replace(/ /g, '%20');
    
        var a = document.createElement('a');
        a.href = data_type + ', ' + table_html;
        a.download = 'Send_My_SMS_' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
        a.click();
    },
    app_links: [{
        name: "Dashboard",
        path: "#Dashboard"
    },{
        name: "Send SMS",
        path: "#SendSMS"
    },{
        name: "Dynamic CSV Message",
        path: "#DynamicMessage"
    }, {
        name: "Add Contacts",
        path: "#AddContacts"
    }, {
        name: "Message History",
        path: "#Messages"
    }, {
        name: "Profile",
        path: "#Profile"
    }]
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__routes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__routes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__routes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_home_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_home_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__controllers_home_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_home_links_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_home_links_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__controllers_home_links_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_send_sms_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_send_sms_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__controllers_send_sms_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controllers_messages_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controllers_messages_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__controllers_messages_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controllers_profile_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controllers_profile_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__controllers_profile_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controllers_add_contacts_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controllers_add_contacts_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__controllers_add_contacts_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__controllers_contacts_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__controllers_contacts_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__controllers_contacts_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__controllers_dynamic_message_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__controllers_dynamic_message_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__controllers_dynamic_message_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__controllers_dashboard_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__controllers_dashboard_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__controllers_dashboard_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_http_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_http_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__services_http_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_authenticate_user_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_authenticate_user_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__services_authenticate_user_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_cookie_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_cookie_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__services_cookie_js__);
/// <reference path="../../node_modules/angular/angular.js"/>

















var app = angular
    .module("RoutesModule", ["ngRoute", "ngCookies"])
    .config(__WEBPACK_IMPORTED_MODULE_0__routes_js__)
    .controller("homeLinks", __WEBPACK_IMPORTED_MODULE_2__controllers_home_links_js__)
    .controller("homeController", __WEBPACK_IMPORTED_MODULE_1__controllers_home_js__)
    .controller("sendSMSController", __WEBPACK_IMPORTED_MODULE_3__controllers_send_sms_js__)
    .controller("messagesController", __WEBPACK_IMPORTED_MODULE_4__controllers_messages_js__)
    .controller("profileController", __WEBPACK_IMPORTED_MODULE_5__controllers_profile_js__)
    .controller("addContactsController", __WEBPACK_IMPORTED_MODULE_6__controllers_add_contacts_js__)
    .controller("contactsController", __WEBPACK_IMPORTED_MODULE_7__controllers_contacts_js__)
    .controller("dynamicMessageController", __WEBPACK_IMPORTED_MODULE_8__controllers_dynamic_message_js__)
    .controller("dashboardController", __WEBPACK_IMPORTED_MODULE_9__controllers_dashboard_js__)
    .controller("demoController", __WEBPACK_IMPORTED_MODULE_9__controllers_dashboard_js__)
    .factory('httpService', __WEBPACK_IMPORTED_MODULE_10__services_http_js__)
    .factory('authenticationService', __WEBPACK_IMPORTED_MODULE_11__services_authenticate_user_js__)
    .factory('cookieService', __WEBPACK_IMPORTED_MODULE_12__services_cookie_js__);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/Home.html",
            controller: "homeController"
        })
        .when("/Home", {
            templateUrl: "templates/Home.html",
            controller: "homeController"
        })
        .when("/SendSMS", {
            templateUrl: "templates/SendSMS.html",
            controller: "sendSMSController"
        })
        .when("/Messages", {
            templateUrl: "templates/Message History.html",
            controller: "messagesController"
        })
        .when("/Profile", {
            templateUrl: "templates/Edit Profile.html",
            controller: "profileController"
        })
        .when("/Contacts", {
            templateUrl: "templates/Contacts.html",
            controller: "contactsController"
        })
        .when("/AddContacts", {
            templateUrl: "templates/Add Contacts.html",
            controller: "addContactsController"
        })
        .when("/DynamicMessage", {
            templateUrl: "templates/Dynamic CSV Message.html",
            controller: "dynamicMessageController"
        })
        .when("/Dashboard", {
            templateUrl: "templates/Dashboard.html",
            controller: "dashboardController"
        })
        .when("/HowToUse", {
            templateUrl: "templates/How To Use.html",
            controller: "demoController"
        });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

utils = __webpack_require__(0);

module.exports = function($scope, authenticationService, $rootScope, httpService, cookieService, $location) {
    angular.element( document.querySelector('.logo') ).addClass('hidden');
    angular.element( document.querySelector('body') ).removeClass('subpage');
    $scope.user = "";
    $scope.password = "";
    $scope.loading = 1;
    authenticationService.authAtHomeRoute();

    $scope.login = function(button) {
        $scope.loading = 0;
        var params = {
            "username": $scope.user,
            "password": $scope.password,
            "action": "login"
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                $scope.loading = 1;
                var data = response.data;
                if (data.success == true) {
                    var params = {
                        "username": data.username,
                        "password": data.password,
                        "api_key": data.api_key
                    };
                    cookieService.setCookie(params);
                    $rootScope.links = utils.app_links;
                    $rootScope.butttons = [{
                        name: data.username + ", Logout",
                        path: "#Home"
                    }];
                    $location.path("/Dashboard");
                    $rootScope.defaultMessage = data.def_message;
                    $rootScope.package = data.package;
                    $rootScope.username = data.username;
                    toastr.success(data.message);
                } else {
                    toastr.error(data.message);
                }
            },
            function(reason) {
                $scope.loading = 1;
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(0);

module.exports = function($scope, $rootScope, cookieService, $location, authenticationService) {
    var cookieData = cookieService.getCookie();
    if (cookieData == undefined) {

    } else if (cookieData.user_type == "Admin" && cookieData != undefined) {
        $rootScope.links = utils.app_links;
        $rootScope.butttons = [{
            name: cookieData.username + ", Logout",
            path: "#Home"
        }];
    } else {}
    $scope.logout = function(button) {
        $rootScope.links = [];
        $rootScope.butttons = [];
        cookieService.clearCookie();
        $location.path('/Home');
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function($rootScope, $scope, authenticationService, httpService, cookieService) {
    angular.element( document.querySelector('body') ).addClass('subpage');
    angular.element( document.querySelector('.logo') ).removeClass('hidden');
    authenticationService.authAtAdminRoute();
    var url = 'request_handler.php';
    $scope.numbers = "";
    $scope.warningsTable = 1;
    $scope.errorsTable = 1;
    $scope.loading = 1;
    $scope.contacts = 1;
    $scope.cookie = cookieService.getCookie();
    $scope.showContacts = function(){
       if($scope.contacts==1)
            $scope.contacts=0;
        else
            $scope.contacts=1;
    }
    var params = {
        "action": "get_package_template",
        "username": $scope.cookie.username,
        "api_key": $scope.cookie.api_key,            
    };
    httpService.sendRequest(
        "GET",
        "request_handler.php",
        function(response) {
            var data = response.data;
            $scope.message = data.message;
            $scope.package = data.package;
        },
        function(reason) {
            toastr.error("Error! " + reason.status + ": " + reason.statusText);
        },
        params
    );
    var updateBalance = function() {
        var params = {
            "action": "get_remaining_sms",
            "api_key": $scope.cookie.api_key,
            "username": $scope.cookie.username
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                var data = response.data;
                $scope.balance = data.balance;
            },
            function(reason) {
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
    updateBalance();
    var updateGroups = function(){
        var params = {
           "action": "get_groups",
            "api_key": $scope.cookie.api_key,
            "username": $scope.cookie.username  
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                var data = response.data;
                $scope.groups = data.groups;
            },
            function(reason) {
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
    updateGroups(); 
    var updateContacts = function(){
        var params = {
           "action": "get_groups_and_contacts",
            "api_key": $scope.cookie.api_key,
            "username": $scope.cookie.username  
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                $scope.contacts = response.data;
            },
            function(reason) {
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
    updateContacts();
    var sentSMSCallBack = function(data,response){
        if(response=="success"){
            var response = angular.fromJson(data);
            $scope.loading = 1;
            var data = angular.fromJson(data);
            $scope.warnings = data.warnings;
            $scope.errors = data.errors;
            if (data.status == "success")
                toastr.success("Message Sent!");
            else
                toastr.error("Message not Sent!");
            if ($scope.warnings != undefined)
                $scope.warningsTable = 0;
            if ($scope.errors != undefined)
                $scope.errorsTable = 0;
            updateBalance();
        }
        else{
            var reason = angular.fromJson(data);
            $scope.loading = 1;
            toastr.error("Error! " + reason.status + ": " + reason.statusText);
        }
    }
    $scope.showLoading = function(){
        $scope.loading=0;
    }
    $("form#sendSMS").submit(function(event) {
        //disable the default form submission
        event.preventDefault();
        //grab all form data  
        var formData = new FormData($(this)[0]);

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                var res = JSON.parse(response);
                sentSMSCallBack(response,"success");
            },
            error: function(reason) {
                var res = JSON.parse(reason);
                sentSMSCallBack(reason,"error");                    
            }
        });
        return false;
    });
    $scope.closeWarningBox = function() {
        $scope.warningsTable = 1;
    }
    $scope.closeErrorBox = function() {
        $scope.errorsTable = 1;
    }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function($scope, authenticationService, httpService, cookieService) {
    angular.element( document.querySelector('body') ).addClass('subpage');
    angular.element( document.querySelector('.logo') ).removeClass('hidden');
    authenticationService.authAtAdminRoute();
    var cookie = cookieService.getCookie();

    var params = {
        "action": "get_message_history",
        "api_key": cookie.api_key,
        "username": cookie.username,
        "min_time": $scope.min_time,
        "max_time": $scope.max_time
    };
    $scope.HistoryTable = 1;
    $scope.loading = 0;
    httpService.sendRequest(
        "GET",
        "request_handler.php",
        function(response) {
            $scope.loading = 1;
            $scope.HistoryTable = 0;
            var data = response.data;
            $scope.total_msg = data.total;
            var counter = 1;
            $scope.pages = [];
            $scope.pages.push(1);
            for (var i = 25; i < data.total; i = i + 25) {
                counter += 1;
                $scope.pages.push(counter);
            }
            $scope.messages = data.messages;
        },
        function(reason) {
            toastr.error("Error! " + reason.status + ": " + reason.statusText);
        },
        params
    );
    $scope.start = 0;
    $scope.changePage = function(page) {
        $scope.start = (page - 1) * 25;
    }
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(cookieService, $scope, authenticationService, httpService) {
    angular.element( document.querySelector('body') ).addClass('subpage');
    angular.element( document.querySelector('.logo') ).removeClass('hidden');
    authenticationService.authAtAdminRoute();
    $scope.cookie = cookieService.getCookie();
    $scope.username = $scope.cookie.username;
    $scope.password = $scope.new_password = $scope.confirm_password = $scope.newPackage = '';
    var params = {
        "action": "get_package_template",
        "username": $scope.cookie.username,
        "api_key": $scope.cookie.api_key            
    };
    httpService.sendRequest(
        "GET",
        "request_handler.php",
        function(response) {
            var data = response.data;
            $scope.message = data.message;
            $scope.package = data.package;
        },
        function(reason) {
            toastr.error("Error! " + reason.status + ": " + reason.statusText);
        },
        params
    );
    $scope.start = 1;
    $scope.changePage = function(page) {
        $scope.start = (page - 1) * 25;
    }
    $scope.updateProfile = function() {
        $scope.cookie = cookieService.getCookie();
        var params = {
            "action": "update_profile",
            "username": $scope.cookie.username,
            "new_username": $scope.username,
            "message": $scope.message,
            "password": $scope.password,
            "package": $scope.newPackage,
            "new_password": $scope.new_password,
            "confirm_password": $scope.confirm_password
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                var data = response.data;
                if (data.success == true) {
                    toastr.success(data.message);
                    var params = {
                        "username": data.username,
                        "api_key": data.api_key
                    };
                    cookieService.setCookie(params);
                } else
                    toastr.error(data.message);
            },
            function(reason) {
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function($scope, $cookies, authenticationService, httpService, cookieService, $location) {
    angular.element( document.querySelector('body') ).addClass('subpage');
    angular.element( document.querySelector('.logo') ).removeClass('hidden');
    authenticationService.authAtAdminRoute();
    var url = 'request_handler.php';
    $scope.loading = $scope.loading1 = $scope.loading2 = $scope.loading3 = $scope.contactsTable = $scope.groupsTable = 1;
    $scope.cookie = cookieService.getCookie();
    $scope.groupContacts = function(group){
        $cookies.put('group', group);
        $location.path("/Contacts");
    }
    var updateGroups = function(){
        $scope.loading2 = 0;
        $scope.groupsTable = 1;
        var params = {
           "action": "get_groups",
            "api_key": $scope.cookie.api_key,
            "username": $scope.cookie.username	
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                $scope.loading2 = 1;
                $scope.groupsTable = 0;
                var data = response.data;
                   $scope.groups = data.groups;
            },
            function(reason) { 
                $scope.loading2 = 1;
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
    updateGroups();
    $("form#addContacts").submit(function(event) {
        $scope.loading1 = 0;
        //disable the default form submission
        event.preventDefault();
        //grab all form data  
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                $scope.loading1 = 1;
                response = JSON.parse(response);
                 if (response.status == "success"){
                    $scope.addedContacts = response.APIResponse.contacts;
                    $scope.contactsTable = 0;
                    toastr.success("Contacts Added");
                }
                else
                    toastr.error(response.errors[0].message);
            },
             error: function(reason) {
                $scope.loading1 = 1;
                alert(reason);
            }
        });

        return false;
    });

    $("form#addGroup").submit(function(event) {
        $scope.loading = 0;
        //disable the default form submission
        event.preventDefault();
        //grab all form data  
        var formData = new FormData($(this)[0]);

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                   response = JSON.parse(response);
                   updateGroups();
                   $scope.loading = 1;
                $scope.groupName = "";
                if (response.status == "success")
                    toastr.success("Group Created");
                else
                    toastr.error(response.errors[0].message);
            },
            error: function(reason) {
                reason = JSON.parse(reason);
                $scope.loading = 1;
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            }
        });

        return false;
    });

    $("form#deleteGroup").submit(function(event) {
        $scope.loading3 = 0;
        //disable the default form submission
        event.preventDefault();
        //grab all form data  
        var formData = new FormData($(this)[0]);

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                // response = JSON.parse(response);
                $scope.loading3 = 1;
                updateGroups();
            },
            error: function(reason) {
                reason = JSON.parse(reason);
                $scope.loading3 = 1;
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            }
        });
        return false;
    });
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function($scope, $cookies, authenticationService, httpService, cookieService, $location) {
    angular.element( document.querySelector('body') ).addClass('subpage');
    $scope.group_selected = $cookies.get('group');
    $scope.cookie = cookieService.getCookie();
    var url = 'request_handler.php';
    $scope.loading = $scope.loading2 = 1;
    $scope.ContactTable = 1;
    var updateGroups = function(){
        $scope.loading2 = 0;
        var params = {
           "action": "get_groups",
            "api_key": $scope.cookie.api_key,
            "username": $scope.cookie.username  
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                $scope.loading2 = 1;
                var data = response.data;
                $scope.groups = data.groups;
            },
            function(reason) {
                $scope.loading2 = 1;
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
    updateGroups(); 
    var updateContacts = function(){
        $scope.loading = 0;
        $scope.ContactTable = 1;
        var params = {
           "action": "get_groups_and_contacts",
           "group": $scope.group_selected,
            "api_key": $scope.cookie.api_key,
            "username": $scope.cookie.username  
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                $scope.loading = 1;
                $scope.ContactTable = 0;
                $scope.contacts = response.data;
            },
            function(reason) {
                $scope.loading = 1;
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
    updateContacts();
    $("form#deleteContacts").submit(function(event) {
        $scope.loading2 = 0;
        //disable the default form submission
        event.preventDefault();
        //grab all form data  
        var formData = new FormData($(this)[0]);

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                // response = JSON.parse(response);
                $scope.loading2 = 1;
                updateContacts();
            },
            error: function(reason) {
                reason = JSON.parse(reason);
                $scope.loading2 = 1;
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            }
        });
        return false;
    });

    $scope.selectAll = function(){
        $("."+$scope.group_selected).selected(true);
    }

    var call= function (){
        alert('hello');
    }
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function($rootScope, $scope, authenticationService, httpService, cookieService) {
    angular.element( document.querySelector('body') ).addClass('subpage');
    angular.element( document.querySelector('.logo') ).removeClass('hidden');
    authenticationService.authAtAdminRoute();
    var url = 'request_handler.php';
    $scope.numbers = "";
    $scope.warningsTable = 1;
    $scope.messagesSentTable = 1;
    $scope.errorsTable = 1;
    $scope.loading = 1;
    $scope.contacts = 1;
    $scope.cookie = cookieService.getCookie();
    $scope.showContacts = function(){
       if($scope.contacts==1)
            $scope.contacts=0;
        else
            $scope.contacts=1;
    }
    var params = {
        "action": "get_package_template",
        "username": $scope.cookie.username,
        "api_key": $scope.cookie.api_key            
    };
    httpService.sendRequest(
        "GET",
        "request_handler.php",
        function(response) {
            var data = response.data;
            $scope.message = data.message;
            $scope.package = data.package;
        },
        function(reason) {
            toastr.error("Error! " + reason.status + ": " + reason.statusText);
        },
        params
    );
    var updateBalance = function() {
        var params = {
            "action": "get_remaining_sms",
            "api_key": $scope.cookie.api_key,
            "username": $scope.cookie.username
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                var data = response.data;
                $scope.balance = data.balance;
            },
            function(reason) {
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
    updateBalance();
    var sentSMSCallBack = function(data,response){
        if(response=="success"){
            var response = angular.fromJson(data);
            $scope.loading = 1;
            var data = angular.fromJson(data);
            $scope.warnings = data.warnings;
            $scope.errors = data.errors;
            $scope.messagesSent = data.messages;
            $scope.messages_not_sent = data.messages_not_sent;
            if ($scope.messages_not_sent != undefined){
                $scope.errors = [$scope.messages_not_sent[0].error];
            }
            if ($scope.warnings != undefined)
                $scope.warningsTable = 0;
            if ($scope.errors != undefined)
                $scope.errorsTable = 0;
            if($scope.errors!=0)
                toastr.success("Message Sent!");
            else
                toastr.error("Message not Sent!");
            if ($scope.messagesSent != undefined)
                $scope.messagesSentTable = 0;
            updateBalance();
        }
        else{
            var reason = angular.fromJson(data);
            $scope.loading = 1;
            toastr.error("Error! " + reason.status + ": " + reason.statusText);
        }
    }
    $scope.showLoading = function(){
        $scope.loading=0;
    }
    $("form#sendSMS").submit(function(event) {
        //disable the default form submission
        event.preventDefault();
        //grab all form data  
        var formData = new FormData($(this)[0]);

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                var res = JSON.parse(response);
                sentSMSCallBack(response,"success");
            },
            error: function(reason) {
                var res = JSON.parse(reason);
                sentSMSCallBack(reason,"error");                    
            }
        });
        return false;
    });
    $scope.closeWarningBox = function() {
        $scope.warningsTable = 1;
    }
    $scope.closeErrorBox = function() {
        $scope.errorsTable = 1;
    }
    $scope.closeMessageSentBox = function(){
        $scope.messagesSentTable = 1;
    }
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports =  function($rootScope, $scope, authenticationService, httpService, cookieService) {
    angular.element( document.querySelector('body') ).addClass('subpage');
    angular.element( document.querySelector('.logo') ).removeClass('hidden');
    authenticationService.authAtAdminRoute();
    var cookie = cookieService.getCookie();
    $scope.loading = 0;
    $scope.loading1 = 0;
    var updateBalance = function() {
        var params = {
            "action": "get_remaining_sms",
            "api_key": cookie.api_key,
            "username": cookie.username
        };
        httpService.sendRequest(
            "GET",
            "request_handler.php",
            function(response) {
                var params = {
                    "action": "get_package_template",
                    "username": cookie.username,
                    "api_key": cookie.api_key
                };
                var data = response.data;
                $scope.balance = data.balance.sms;
                var balance = data.balance;
                httpService.sendRequest(
                    "GET",
                    "request_handler.php",
                    function(response) {
                        $scope.loading1 = 1;
                        var data1 = response.data;
                        var package1 = data1.package;
                        var sent = package1 - balance.sms;
                        var values = [];
                        values.push(balance.sms);
                        values.push(sent);
                        var data = [{
                          values: values,
                          labels: ['SMS-Remaining', 'SMS-Sent'],
                          type: 'pie'
                        }];

                        var layout = {
                          title:'SMS Usage',
                          height: 350,
                          width: 400
                        };

                        Plotly.newPlot('pieChartContainer', data, layout);

                    },
                    function(reason) {
                        $scope.loading1 = 1;
                        toastr.error("Error! " + reason.status + ": " + reason.statusText);
                    },
                    params
                );
            },
            function(reason) {
                toastr.error("Error! " + reason.status + ": " + reason.statusText);
            },
            params
        );
    }
    updateBalance();

    var params = {
        "action": "get_message_history",
        "api_key": cookie.api_key,
        "username": cookie.username
    };
    httpService.sendRequest(
        "GET",
        "request_handler.php",
        function(response) {
            $scope.loading = 1;
            var data = response.data;
            $scope.messages = data.messages;
            var dataChart = {};
            angular.forEach($scope.messages, function(value){
                var dateTime = new Date(value['datetime']);
                var dateMonthOld = new Date();
                dateMonthOld.setDate(dateMonthOld.getDate()-30);
                dateMonthOld.setHours(0,0,0,0);
                if(dateTime>=dateMonthOld){
                    if(dataChart[dateTime.getDate()+"-"+(dateTime.getMonth()+1)+"-"+dateTime.getFullYear()]==undefined)
                        dataChart[dateTime.getDate()+"-"+(dateTime.getMonth()+1)+"-"+dateTime.getFullYear()] = 1;
                    else
                        dataChart[dateTime.getDate()+"-"+(dateTime.getMonth()+1)+"-"+dateTime.getFullYear()] += 1;
                }
            });
            var x = [];
            var y = [];
            angular.forEach(dataChart, function(value, key){
                  x.push(key);
                  y.push(value);
            });
            x = x.reverse();
            y = y.reverse();
            var trace1 = {
              x: x,
              y: y,
              line: {shape: 'spline'},
              type: 'scatter'
            };
            var layout = {
              title:'SMS sent in last 30 days',
                height: 400,
                width: 800
            };
            var data = [trace1];
            Plotly.newPlot('lineChartContainer', data, layout);
        },
        function(reason) {
            $scope.loading = 1;
            toastr.error("Error! " + reason.status + ": " + reason.statusText);
        },
        params
    );       
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function($http){
    return{
        sendRequest: function(method,requestUrl,successCallback,errorCallback,parameters){
            $http({
                method: method,
                url: requestUrl,
                params: parameters})
                .then(successCallback,errorCallback);
        }
    };
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function($http,$cookies){
    return{
        getCookie: function(){
           var user_type = $cookies.get('user_type');
           if( angular.equals(user_type,undefined)){
            return undefined;
           }
           else{
               var return_data = {
                    username: $cookies.get('username'),
                    user_type: user_type,
                    api_key: $cookies.get('api_key')
               }
               return return_data;
           }
        },
        setCookie: function(params){
           $cookies.put('user_type', "Admin");
           $cookies.put('username', params.username);
           $cookies.put('api_key', params.api_key);
        },
        clearCookie: function(){
            var user =$cookies.get('user_type');
            if(!angular.equals(user,undefined)){
                $cookies.remove('username');
                $cookies.remove('user_type');
                $cookies.remove('api_key');
            }
        }
    };
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function($rootScope,cookieService,$location){
    return{
        authAtAdminRoute: function(){
            var cookieData = cookieService.getCookie();
            if(cookieData==undefined){
                $location.path('/Home');
                $rootScope.links = [];
                $rootScope.butttons = [];
            }
            else{
              $rootScope.links = [{name: "Dashboard",path: "#Dashboard"},{name: "Send SMS",path: "#SendSMS"},{name: "Dynamic CSV Message",path: "#DynamicMessage"},{name: "Add Contacts",path: "#AddContacts"},{name: "Message History",path: "#Messages"},{name: "Profile",path: "#Profile"}];
              $rootScope.butttons = [{name: cookieData.username+", Logout",path: "#Home"}];
           }
        },
        authAtHomeRoute: function(){
            var cookieData = cookieService.getCookie();
            if(cookieData==undefined){
            }else if(cookieData.user_type=="Admin"){
                $location.path('/Dashboard');
                $rootScope.links = [{name: "Dashboard",path: "#Dashboard"},{name: "Send SMS",path: "#SendSMS"},{name: "Dynamic CSV Message",path: "#DynamicMessage"},{name: "Add Contacts",path: "#AddContacts"},{name: "Message History",path: "#Messages"},{name: "Profile",path: "#Profile"}];
                $rootScope.butttons = [{name: cookieData.username+", Logout",path: "#Home"}];                 
            }
            else{
               $rootScope.links = [];
               $rootScope.butttons = [];
            }
        }
    };
};

/***/ })
/******/ ]);