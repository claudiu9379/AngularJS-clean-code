(function() {
    'use strict';

    angular
        .module('app.todo')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state('todo', {
                    url: '/todo',
                    templateUrl: '/app/todoList3/todo.view.html',
                    controller: 'TodoController',
                    controllerAs: 'vm'
                });
        }]);
})();
