module.exports = function($scope, authenticationService, httpService, cookieService) {
    angular.element( document.querySelector('body') ).addClass('subpage');
    angular.element( document.querySelector('.logo') ).removeClass('hidden');
    angular.element( document.querySelector('#header') ).addClass('hidden');
    authenticationService.authAtAdminRoute();
}