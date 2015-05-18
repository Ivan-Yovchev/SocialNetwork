(function () {
    var module = angular.module('SocialNetworkApp');

    var CurrentUserQueryExecutor = function ($http, rootUrl, Authorization) {

        var getUser = function() {
            return $http.get(rootUrl + 'me', Authorization.getHeaders());
        }

        var changePassword = function (credentials) {
            return $http.put(rootUrl + 'me/changepassword', credentials, Authorization.getHeaders());
        }

        var editProfile = function (user) {
            return $http.put(rootUrl + "me", user, Authorization.getHeaders());
        }

        var getFriendRequests = function() {
            return $http.get(rootUrl + "me/requests", Authorization.getHeaders());
        }

        return {
            getUser: getUser,
            changePassword: changePassword,
            editProfile: editProfile,
            getFriendRequests: getFriendRequests
        };
    }

    module.factory('CurrentUserQueryExecutor', CurrentUserQueryExecutor);
}());