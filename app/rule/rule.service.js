(function() {
    'use strict';

    angular.module('app.rule')
        .service('ruleService', RuleService);

    RuleService.$inject = [];


    function RuleService() {

        var rs = {
            test: function(a,b) {
                return  a+b;
            }

        };
        return rs;
    }
})();
