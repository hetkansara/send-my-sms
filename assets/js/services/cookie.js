module.exports = function($http,$cookies){
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
};