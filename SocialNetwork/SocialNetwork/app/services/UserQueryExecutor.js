(function() {
    var module = angular.module('SocialNetworkApp');

    var UserQueryExecutor = function ($http, rootUrl, Authorization) {
        var registerUser = function(user) {
            return $http.post(rootUrl + 'users/register', user);
        }

        return {
            registerUser: registerUser
        };
    }

    module.factory('UserQueryExecutor', UserQueryExecutor);
}());