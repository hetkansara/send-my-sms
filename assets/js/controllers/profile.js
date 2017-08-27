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