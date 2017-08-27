app.factory('httpService',function($http){
    return{
        sendRequest: function(method,requestUrl,successCallback,errorCallback,parameters){
            $http({
                method: method,
                url: requestUrl,
                params: parameters})
                .then(successCallback,errorCallback);
        }
    };
})
.factory('authenticateUser',function($rootScope,myCookieService,$location){
    return{
        authAtAdminRoute: function(){
            var cookieData = myCookieService.getCookie();
            if(cookieData==undefined){
                $location.path('/Home');
                $rootScope.links = [];
                $rootScope.butttons = [];
            }
            else{
              $rootScope.links = [{name: "Dashboard",path: "#Dashboard"},{name: "Send SMS",path: "#SendSMS"},{name: "Dynamic CSV Message",path: "#DynamicMessage"},{name: "Add Contacts",path: "#AddContacts"},{name: "Message History",path: "#Messages"},{name: "Profile",path: "#Profile"}];
              $rootScope.butttons = [{name: cookieData.username+", Logout",path: "#Home"}];
           }
        },
        authAtHomeRoute: function(){
            var cookieData = myCookieService.getCookie();
            if(cookieData==undefined){
            }else if(cookieData.user_type=="Admin"){
                $location.path('/Dashboard');
                $rootScope.links = [{name: "Dashboard",path: "#Dashboard"},{name: "Send SMS",path: "#SendSMS"},{name: "Dynamic CSV Message",path: "#DynamicMessage"},{name: "Add Contacts",path: "#AddContacts"},{name: "Message History",path: "#Messages"},{name: "Profile",path: "#Profile"}];
                $rootScope.butttons = [{name: cookieData.username+", Logout",path: "#Home"}];                 
            }
            else{
               $rootScope.links = [];
               $rootScope.butttons = [];
            }
        }
    };
})
.factory('myCookieService',function($http,$cookies){
    return{
        getCookie: function(){
           var user_type = $cookies.get('user_type');
           if( angular.equals(user_type,undefined)){
            return undefined;
           }
           else{
               var return_data = {
                    username: $cookies.get('username'),
                    user_type: user_type,
                    api_key: $cookies.get('api_key')
               }
               return return_data;
           }
        },
        setCookie: function(params){
           $cookies.put('user_type', "Admin");
           $cookies.put('username', params.username);
           $cookies.put('api_key', params.api_key);
        },
        clearCookie: function(){
            var user =$cookies.get('user_type');
            if(!angular.equals(user,undefined)){
                $cookies.remove('username');
                $cookies.remove('user_type');
                $cookies.remove('api_key');
            }
        }
    };
});
