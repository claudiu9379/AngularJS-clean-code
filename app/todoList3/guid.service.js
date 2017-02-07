(function() {
    'use strict';

    angular.module('app.todo')
        .service('guidService', GuidService);

    GuidService.$inject = [];


    function GuidService() {

        var rs = 
        {
            guid:function()
            {
              function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
                }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
        }
        return rs;
    }
})();
