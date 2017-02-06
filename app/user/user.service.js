(function() {
    'use strict';

    angular.module('app.user')
        .service('userService', UserService);

    UserService.$inject = [];


    function UserService() {

        var rs = {
            add: function(a,b) {
                return  a+b;
            }

        };
        return rs;
    }
})();
