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