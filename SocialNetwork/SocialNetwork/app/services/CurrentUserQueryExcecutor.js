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

        var getOwnFriendsPreview = function() {
            return $http.get(rootUrl + "me/friends/preview", Authorization.getHeaders());
        }

        var getOwnFriendsFull = function () {
            return $http.get(rootUrl + "me/friends", Authorization.getHeaders());
        }

        var getNewsFeed = function() {
            return $http.get(rootUrl + "me/feed?StartPostId=&PageSize=5", Authorization.getHeaders());
        }

        var likePost = function(postId) {
            return $http.post(rootUrl + "Posts/" + postId + "/likes", null, Authorization.getHeaders());
        }

        var unlikePost = function (postId) {
            return $http.delete(rootUrl + "Posts/" + postId + "/likes", Authorization.getHeaders());
        }

        var addCommentToPost = function(postId, comment) {
            return $http.post(rootUrl + "posts/" + postId + "/comments", comment, Authorization.getHeaders());
        }

        var likeComment = function(postId, commentId) {
            return $http.post(rootUrl + "posts/" + postId + "/comments/" + commentId + "/likes", null, Authorization.getHeaders());
        }

        var unlikeComment = function (postId, commentId) {
            return $http.delete(rootUrl + "posts/" + postId + "/comments/" + commentId + "/likes", Authorization.getHeaders());
        }

        return {
            getUser: getUser,
            changePassword: changePassword,
            editProfile: editProfile,
            getFriendRequests: getFriendRequests,
            searchUsersByName: searchUsersByName,
            sendFriendRequest: sendFriendRequest,
            acceptRequest: acceptRequest,
            rejectRequest: rejectRequest,
            getOwnFriendsPreview: getOwnFriendsPreview,
            getOwnFriendsFull: getOwnFriendsFull,
            getNewsFeed: getNewsFeed,
            likePost: likePost,
            unlikePost: unlikePost,
            addCommentToPost: addCommentToPost,
            likeComment: likeComment,
            unlikeComment: unlikeComment
        };
    }

    module.factory('CurrentUserQueryExecutor', CurrentUserQueryExecutor);
}());