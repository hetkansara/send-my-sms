/// <reference path="angular.js"/>

var app = angular
    .module("RoutesModule", ["ngRoute", "ngCookies"])
    .config(function($routeProvider) {
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
            })      
    })
    .controller("homeLinks", function($scope, $rootScope, myCookieService, $location, authenticateUser) {
        var cookieData = myCookieService.getCookie();
        if (cookieData == undefined) {

        } else if (cookieData.user_type == "Admin" && cookieData != undefined) {
            $rootScope.links = [{
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
            }];
            $rootScope.butttons = [{
                name: cookieData.username + ", Logout",
                path: "#Home"
            }];
        } else {}
        $scope.logout = function(button) {
            $rootScope.links = [];
            $rootScope.butttons = [];
            myCookieService.clearCookie();
            $location.path('/Home');
        }

    })
    .controller("homeController", function($scope, authenticateUser, $rootScope, httpService, myCookieService, $location) {
        angular.element( document.querySelector('.logo') ).addClass('hidden');
        angular.element( document.querySelector('body') ).removeClass('subpage');
        $scope.user = "";
        $scope.password = "";
        $scope.loading = 1;
        authenticateUser.authAtHomeRoute();

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
                        myCookieService.setCookie(params);
                        $rootScope.links = [{
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
                        }];
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
    })
    .controller("sendSMSController", function($rootScope, $scope, authenticateUser, httpService, myCookieService) {
        angular.element( document.querySelector('body') ).addClass('subpage');
        angular.element( document.querySelector('.logo') ).removeClass('hidden');
        authenticateUser.authAtAdminRoute();
        var url = 'http://localhost/send%20my%20sms/request_handler.php';
        $scope.numbers = "";
        $scope.warningsTable = 1;
        $scope.errorsTable = 1;
        $scope.loading = 1;
        $scope.contacts = 1;
        $scope.cookie = myCookieService.getCookie();
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
    })
    .controller("messagesController", function($scope, authenticateUser, httpService, myCookieService) {
        angular.element( document.querySelector('body') ).addClass('subpage');
        angular.element( document.querySelector('.logo') ).removeClass('hidden');
        authenticateUser.authAtAdminRoute();
        var cookie = myCookieService.getCookie();

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
    })
    .controller("profileController", function(myCookieService, $scope, authenticateUser, httpService) {
        angular.element( document.querySelector('body') ).addClass('subpage');
        angular.element( document.querySelector('.logo') ).removeClass('hidden');
        authenticateUser.authAtAdminRoute();
        $scope.cookie = myCookieService.getCookie();
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
            $scope.cookie = myCookieService.getCookie();
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
                        myCookieService.setCookie(params);
                    } else
                        toastr.error(data.message);
                },
                function(reason) {
                    toastr.error("Error! " + reason.status + ": " + reason.statusText);
                },
                params
            );
        }
    })
    .controller("addContactsController", function($scope, $cookies, authenticateUser, httpService, myCookieService, $location) {
        angular.element( document.querySelector('body') ).addClass('subpage');
        angular.element( document.querySelector('.logo') ).removeClass('hidden');
        authenticateUser.authAtAdminRoute();
        var url = 'http://localhost/send%20my%20sms/request_handler.php';
        $scope.loading = $scope.loading1 = $scope.loading2 = $scope.loading3 = $scope.contactsTable = $scope.groupsTable = 1;
        $scope.cookie = myCookieService.getCookie();
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
    }) 
    .controller("contactsController", function($scope, $cookies, authenticateUser, httpService, myCookieService, $location) {
        angular.element( document.querySelector('body') ).addClass('subpage');
        $scope.group_selected = $cookies.get('group');
        $scope.cookie = myCookieService.getCookie();
        var url = 'http://localhost/send%20my%20sms/request_handler.php';
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
    })
    .controller("dynamicMessageController", function($rootScope, $scope, authenticateUser, httpService, myCookieService) {
        angular.element( document.querySelector('body') ).addClass('subpage');
        angular.element( document.querySelector('.logo') ).removeClass('hidden');
        authenticateUser.authAtAdminRoute();
        var url = 'http://localhost/send%20my%20sms/request_handler.php';
        $scope.numbers = "";
        $scope.warningsTable = 1;
        $scope.messagesSentTable = 1;
        $scope.errorsTable = 1;
        $scope.loading = 1;
        $scope.contacts = 1;
        $scope.cookie = myCookieService.getCookie();
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
    })
    .controller("dashboardController", function($rootScope, $scope, authenticateUser, httpService, myCookieService) {
        angular.element( document.querySelector('body') ).addClass('subpage');
        angular.element( document.querySelector('.logo') ).removeClass('hidden');
        authenticateUser.authAtAdminRoute();
        var cookie = myCookieService.getCookie();
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
                            var package = data1.package;
                            var sent = package - balance.sms;
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
    })
    .controller("demoController", function($scope, authenticateUser, httpService, myCookieService) {
        angular.element( document.querySelector('body') ).addClass('subpage');
        angular.element( document.querySelector('.logo') ).removeClass('hidden');
        angular.element( document.querySelector('#header') ).addClass('hidden');
        authenticateUser.authAtAdminRoute();
        
    });
    
    function selectAll(value){
        $('.'+value).prop('checked',$('#'+value).is(":checked"));
    }
    function exportToExcel(element){
        var data_type = 'data:application/vnd.ms-excel';
        var table_div = document.getElementById(element);
        var table_html = table_div.outerHTML.replace(/ /g, '%20');

        var a = document.createElement('a');
        a.href = data_type + ', ' + table_html;
        a.download = 'Send_My_SMS_' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
        a.click();
    }