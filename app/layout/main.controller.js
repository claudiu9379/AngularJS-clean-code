(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', '$state', 'storageService', '$timeout', 'config'];
    /* @ngInject */
    function MainController($rootScope, $scope, $state, storageService, $timeout, config) {

        var vm = this;
        
        vm.loggedUser = storageService.loggedUser;
        
        $scope.$on('userChanged', function() {
            vm.loggedUser = storageService.loggedUser;
            
        });
    }
})();
