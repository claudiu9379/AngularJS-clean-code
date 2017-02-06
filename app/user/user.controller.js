(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);

    UserController.$inject = ['userService'];

    function UserController(userService) {

        var vm = this;
        vm.name = "test";
        vm.result = 0;
        function init() {
            vm.result = userService.add(2,7);
        }

        init();

    }
})();
