(function() {
    'use strict';

    angular.module('app.feed')
        .service('feedService', FeedService);

    FeedService.$inject = [];


    function FeedService() {

        var rs = {
            minus: function(a,b) {
                return  a-b;
            }

        };
        return rs;
    }
})();
