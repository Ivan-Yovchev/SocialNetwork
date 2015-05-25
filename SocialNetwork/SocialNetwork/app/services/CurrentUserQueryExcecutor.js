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

        var getNewsFeed = function (postId) {
            if (postId === undefined) {
                return $http.get(rootUrl + "me/feed?StartPostId=&PageSize=5", Authorization.getHeaders());
            } else {
                return $http.get(rootUrl + "me/feed?StartPostId=" + postId + "&PageSize=5", Authorization.getHeaders());
            }
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

        var editPost = function(postId, post) {
            return $http.put(rootUrl + "Posts/" + postId, post, Authorization.getHeaders());
        }

        var deletePost = function (postId) {
            return $http.delete(rootUrl + "Posts/" + postId, Authorization.getHeaders());
        }

        var editComment = function(postId, commentId, comment) {
            return $http.put(rootUrl + "posts/" + postId + "/comments/" + commentId, comment, Authorization.getHeaders());
        }

        var deleteComment = function (postId, commentId) {
            return $http.delete(rootUrl + "posts/" + postId + "/comments/" + commentId, Authorization.getHeaders());
        }

        var getAllPostComments = function(postId) {
            return $http.get(rootUrl + "posts/" + postId + "/comments", Authorization.getHeaders());
        }

        var getUserPreviewData = function(username) {
            return $http.get(rootUrl + "users/" + username + "/preview", Authorization.getHeaders());
        }

        var addNewPost = function(post) {
            return $http.post(rootUrl + "/posts", post, Authorization.getHeaders());
        }

        var getFriendFriendsPreview = function(username) {
            return $http.get(rootUrl + "users/" + username + "/friends/preview", Authorization.getHeaders());
        }

        var getUserWall = function (username, postId) {
            if (postId === undefined) {
                return $http.get(rootUrl + "users/" + username + "/wall?StartPostId=&PageSize=5", Authorization.getHeaders());
            } else {
                return $http.get(rootUrl + "users/" + username + "/wall?StartPostId=" + postId + "&PageSize=5", Authorization.getHeaders());
            }
        }

        var getFriendFriendsFull = function(username) {
            return $http.get(rootUrl + "users/" + username + "/friends", Authorization.getHeaders());
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
            unlikeComment: unlikeComment,
            editPost: editPost,
            deletePost: deletePost,
            editComment: editComment,
            deleteComment: deleteComment,
            getAllPostComments: getAllPostComments,
            getUserPreviewData: getUserPreviewData,
            addNewPost: addNewPost,
            getFriendFriendsPreview: getFriendFriendsPreview,
            getUserWall: getUserWall,
            getFriendFriendsFull: getFriendFriendsFull
        };
    }

    module.factory('CurrentUserQueryExecutor', CurrentUserQueryExecutor);
}());