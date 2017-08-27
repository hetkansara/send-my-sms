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