(function () {
    var module = angular.module('SocialNetworkApp');

    var userProfileController = function ($scope, $rootScope, $location, $routeParams, UserQueryExecutor, CurrentUserQueryExecutor, Authorization, Notifications) {
        var startPostId;

        CurrentUserQueryExecutor.getUser()
            .then(function(result) {
                $scope.me = result.data;
            }, function(error) {
                Notifications.error(error.data["message"]);
            });

        var getFriendFriendsPreview = function() {
            CurrentUserQueryExecutor.getFriendFriendsPreview($routeParams.username)
            .then(function (result) {
                $scope.userFriends = result.data;
            }, function (error) {
                Notifications.error(error.data["message"]);
            });
        }

        var showUserProfile = function (username) {
            return UserQueryExecutor.getUserFullData(username)
                .then(function(result) {
                    $scope.user = result.data;
                    if (result.data["isFriend"] === true) {
                        $scope.isFriend = true;
                        $scope.isNotFriend = false;
                    } else {
                        $scope.isNotFriend = true;
                        $scope.isFriend = false;
                    }

                    if (result.data["hasPendingRequest"] === true && $scope.isFriend === true) {
                        $scope.isPending = false;
                        $scope.isNotFriend = false;
                    } else if (result.data["hasPendingRequest"] === true && $scope.isFriend === false) {
                        $scope.isPending = true;
                        $scope.isNotFriend = false;
                    } else {
                        $scope.isPending = false;
                    }
                    console.log($scope.user);
                    //console.log($scope.isFriend);
                    //console.log($scope.isNotFriend);
                    //console.log($scope.isPending);
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var sendFriendRequest = function(username) {
            return CurrentUserQueryExecutor.sendFriendRequest(username)
                .then(function(result) {
                    Notifications.success(result.data["message"]);
                    $scope.isPending = true;
                    $scope.isNotFriend = false;
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var addNewPost = function (postText, username) {
            if (postText === "" || postText === undefined) {
                Notifications.error("Post content cannot be empty");
            } else {
                var post = {
                    postContent: postText,
                    username: username
                };

                return CurrentUserQueryExecutor.addNewPost(post)
                    .then(function (result) {
                        $scope.userWallPosts.unshift(result.data);
                        Notifications.success("Successfully added post");
                }, function(error) {
                        Notifications.error(error.data["message"]);
                    });
            }
        }

        var getUserWall = function() {
            $scope.standbyWall = true;
            return CurrentUserQueryExecutor.getUserWall($routeParams.username, startPostId)
                .then(function (result) {
                    $scope.userWallPosts = $scope.userWallPosts ? $scope.userWallPosts.concat(result.data) : [].concat(result.data);
                    console.log(result.data);
                    if ($scope.userWallPosts.length > 0) {
                        startPostId = $scope.userWallPosts[$scope.userWallPosts.length - 1].id;
                    }

                    $scope.standbyWall = false;
                }, function (error) {
                    Notifications.error(error.data["message"]);
                });
        }
        getUserWall();

        var likePost = function (post) {
            return CurrentUserQueryExecutor.likePost(post.id)
                .then(function (result) {
                    post.liked = true;
                    post.likesCount++;
                    Notifications.success("Successfully liked post");
                }, function (error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var unlikePost = function (post) {
            return CurrentUserQueryExecutor.unlikePost(post.id)
                .then(function (result) {
                    post.liked = false;
                    post.likesCount--;
                    Notifications.success("Successfully unliked post");
                }, function (error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var editPost = function (post, postText) {
            if (postText === "" || postText === undefined) {
                Notifications.error("Post content cannot be empty");
            } else {
                var editedPost = {
                    postContent: postText
                };

                return CurrentUserQueryExecutor.editPost(post.id, editedPost)
                    .then(function (result) {
                        post.postContent = postText;
                        Notifications.success("Successfully edited post");
                    }, function (error) {
                        Notifications.error(error.data["message"]);
                    });
            }
        }

        var deletePost = function (post) {
            return CurrentUserQueryExecutor.deletePost(post.id)
                .then(function (result) {
                    var index = $scope.userWallPosts.indexOf(post);
                    $scope.userWallPosts.splice(index, 1);
                    Notifications.success("Successfully deleted post");
                }, function (error) {
                    Notifications.error(error.data["message"]);
                });
        }

        $scope.showUserProfile = showUserProfile;
        $scope.selectedUserUsername = $routeParams.username;
        $scope.sendFriendRequest = sendFriendRequest;
        $scope.addNewPost = addNewPost;
        $scope.getFriendFriendsPreview = getFriendFriendsPreview;
        $scope.getUserWall = getUserWall;
        $scope.likePost = likePost;
        $scope.unlikePost = unlikePost;
        $scope.deletePost = deletePost;
        $scope.editPost = editPost;
        showUserProfile($scope.selectedUserUsername);
    }

    module.controller('UserProfileController', userProfileController);
}());