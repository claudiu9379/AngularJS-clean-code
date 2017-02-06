(function() {
    'use strict';

    angular
        .module('app.user')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state('user', {
                    url: '/user',
                    templateUrl: '/app/user/user.view.html',
                    controller: 'UserController',
                    controllerAs: 'vm'
                });
        }]);
})();
