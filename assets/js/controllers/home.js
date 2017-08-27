utils = require('../utils.js');

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