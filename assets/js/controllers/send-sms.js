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