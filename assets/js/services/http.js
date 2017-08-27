module.exports = function($http){
    return{
        sendRequest: function(method,requestUrl,successCallback,errorCallback,parameters){
            $http({
                method: method,
                url: requestUrl,
                params: parameters})
                .then(successCallback,errorCallback);
        }
    };
}