(function() {
    'use strict';

    angular.module('app.security')
        .service('securityApiService', SecurityApiService);

    SecurityApiService.$inject = ['$http', '$q'];

    function SecurityApiService($http, $q) {


        return {
            post: function(url, data, options) {
                console.log(url);

                var deferred = $q.defer();
                var webApiUrl = "http://localhost:5501/" + url;
                var contentType = "application/json";
                if (options && options.contentType != undefined) {
                    contentType = options.contentType;
                }
                var config = {
                    headers: {
                        'Content-Type': contentType
                    }
                }
                if (options && options.hasFiles) {
                    config.transformRequest = angular.identity;
                    config.headers['Content-Type'] = undefined;
                }

                $http.post(webApiUrl, data, config)
                    .then(function successCallback(data) {
                       deferred.resolve(data);
                    }, function errorCallback(response) {
                         deferred.resolve({
                            success: false,
                            data: null
                        });
                    });
                return deferred.promise;
            }
        }
    }

})();
