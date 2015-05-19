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

        var searchUsersByName = function(searchTerm) {
            return $http.get(rootUrl + "users/search?searchTerm=" + searchTerm, Authorization.getHeaders());
        }

        var sendFriendRequest = function(username) {
            return $http.post(rootUrl + "me/requests/" + username, null, Authorization.getHeaders());
        }

        var acceptRequest = function(requestId) {
            return $http.put(rootUrl + "me/requests/" + requestId + "?status=approved", null, Authorization.getHeaders());
        }

        var rejectRequest = function (requestId) {
            return $http.put(rootUrl + "me/requests/" + requestId + "?status=rejected", null, Authorization.getHeaders());
        }

        return {
            getUser: getUser,
            changePassword: changePassword,
            editProfile: editProfile,
            getFriendRequests: getFriendRequests,
            searchUsersByName: searchUsersByName,
            sendFriendRequest: sendFriendRequest,
            acceptRequest: acceptRequest,
            rejectRequest: rejectRequest
        };
    }

    module.factory('CurrentUserQueryExecutor', CurrentUserQueryExecutor);
}());