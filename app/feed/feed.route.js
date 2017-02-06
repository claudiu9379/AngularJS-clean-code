(function() {
    'use strict';

    angular
        .module('app.feed')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state('feed', {
                    url: '/feed',
                    templateUrl: '/app/feed/feed.view.html',
                    controller: 'FeedController',
                    controllerAs: 'vm'
                });
        }]);
})();
