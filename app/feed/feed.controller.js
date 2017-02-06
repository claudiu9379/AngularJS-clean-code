(function() {
    'use strict';

    angular
        .module('app.feed')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['userService','feedService'];

    function FeedController(userService,feedService) {

        var vm = this;
        vm.name = "test";
        vm.result = 0;
        function init() {
            vm.result = userService.add(3,8);
            vm.result1 = feedService.minus(2,7);
        }

        init();

    }
})();
