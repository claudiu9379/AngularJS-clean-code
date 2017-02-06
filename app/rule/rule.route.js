(function() {
    'use strict';

    angular
        .module('app.rule')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state('rule', {
                    url: '/rule',
                    templateUrl: '/app/rule/rule.view.html',
                    controller: 'RuleController',
                    controllerAs: 'vm'
                });
        }]);
})();
