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