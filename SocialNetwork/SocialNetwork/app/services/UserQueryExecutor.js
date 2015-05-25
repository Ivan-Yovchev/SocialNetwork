(function() {
    var module = angular.module('SocialNetworkApp');

    var UserQueryExecutor = function ($http, rootUrl, Authorization) {
        var getUserFullData = function(username) {
            return $http.get(rootUrl + "users/" + username, Authorization.getHeaders());
        }

        return {
            getUserFullData: getUserFullData
        };
    }

    module.factory('UserQueryExecutor', UserQueryExecutor);
}());