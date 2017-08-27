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