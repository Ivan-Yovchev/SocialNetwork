(function() {
    var module = angular.module('SocialNetworkApp');

    var UserQueryExecutor = function ($http, rootUrl, Authorization) {
        var registerUser = function(user) {
            return $http.post(rootUrl + 'users/register', user);
        }

        var getUserFullData = function(username) {
            return $http.get(rootUrl + "users/" + username, Authorization.getHeaders());
        }

        return {
            registerUser: registerUser,
            getUserFullData: getUserFullData
        };
    }

    module.factory('UserQueryExecutor', UserQueryExecutor);
}());