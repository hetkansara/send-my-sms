module.exports = function($rootScope,cookieService,$location){
    return{
        authAtAdminRoute: function(){
            var cookieData = cookieService.getCookie();
            if(cookieData==undefined){
                $location.path('/Home');
                $rootScope.links = [];
                $rootScope.butttons = [];
            }
            else{
              $rootScope.links = [{name: "Dashboard",path: "/#!/Dashboard"},{name: "Send SMS",path: "/#!/SendSMS"},{name: "Dynamic CSV Message",path: "/#!/DynamicMessage"},{name: "Add Contacts",path: "/#!/AddContacts"},{name: "Message History",path: "/#!/Messages"},{name: "Profile",path: "/#!/Profile"}];
              $rootScope.butttons = [{name: cookieData.username+", Logout",path: "/#!/Home"}];
           }
        },
        authAtHomeRoute: function(){
            var cookieData = cookieService.getCookie();
            if(cookieData==undefined){
            }else if(cookieData.user_type=="Admin"){
                $location.path('/Dashboard');
                $rootScope.links = [{name: "Dashboard",path: "/#!/Dashboard"},{name: "Send SMS",path: "/#!/SendSMS"},{name: "Dynamic CSV Message",path: "/#!/DynamicMessage"},{name: "Add Contacts",path: "/#!/AddContacts"},{name: "Message History",path: "/#!/Messages"},{name: "Profile",path: "/#!/Profile"}];
                $rootScope.butttons = [{name: cookieData.username+", Logout",path: "/#!/Home"}];                 
            }
            else{
               $rootScope.links = [];
               $rootScope.butttons = [];
            }
        }
    };
};