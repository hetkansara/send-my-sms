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