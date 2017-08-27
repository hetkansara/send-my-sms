var utils = require('../utils.js');

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