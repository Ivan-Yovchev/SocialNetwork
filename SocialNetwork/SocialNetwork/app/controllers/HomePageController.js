(function () {
    var module = angular.module('SocialNetworkApp');

    var homePageController = function ($scope, $location, CurrentUserQueryExecutor, Notifications) {
        var startPostId;

        CurrentUserQueryExecutor.getUser()
            .then(function(result) {
                $scope.myUsername = result.data["username"];
            }, function(error) {
                Notifications.error(error.data["message"]);
            });

        CurrentUserQueryExecutor.getOwnFriendsPreview()
            .then(function(result) {
                $scope.myFriendsList = result.data["friends"];
            }, function (error) {
                Notifications.error(error.data["message"]);
            });

        var getNewsFeed = function () {
            $scope.standby = true;
            return CurrentUserQueryExecutor.getNewsFeed(startPostId)
                .then(function(result) {
                    $scope.newsFeedPosts = $scope.newsFeedPosts ? $scope.newsFeedPosts.concat(result.data) : [].concat(result.data);
                    console.log(result.data);
                    if ($scope.newsFeedPosts.length > 0) {
                        startPostId = $scope.newsFeedPosts[$scope.newsFeedPosts.length - 1].id;
                    }

                    $scope.standby = false;
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var getOwnFriendsPreview = function () {
            return CurrentUserQueryExecutor.getOwnFriendsPreview()
                .then(function(result) {
                    $scope.friendsCount = result.data["totalCount"];
                    $scope.friends = result.data["friends"];
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }
        getOwnFriendsPreview();

        var openSelectedUserProfile = function (username) {
            $location.path("/users/" + username);
        }

        var likePost = function(post) {
            return CurrentUserQueryExecutor.likePost(post.id)
                .then(function(result) {
                    post.liked = true;
                    post.likesCount++;
                    Notifications.success("Successfully liked post");
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var unlikePost = function (post) {
            return CurrentUserQueryExecutor.unlikePost(post.id)
                .then(function(result) {
                    post.liked = false;
                    post.likesCount--;
                    Notifications.success("Successfully unliked post");
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var addCommentToPost = function(post, commentText) {
            if (commentText === "" || commentText === undefined) {
                Notifications.error("The commentText cannot be empty");
            } else {
                var comment = {
                    commentContent: commentText
                };

                return CurrentUserQueryExecutor.addCommentToPost(post.id, comment)
                    .then(function(result) {
                        post.comments.unshift(result.data);
                        post.totalCommentsCount++;
                        if (post.comments.length > 3) {
                            showLessComments(post);
                            post.hidableComments = true;
                        }
                        Notifications.success("Successfully added a comment");
                    }, function(error) {
                        Notifications.error(error.data["message"]);
                    });
            }
        }

        var likePostComment = function(post, comment) {
            return CurrentUserQueryExecutor.likeComment(post.id, comment.id)
                .then(function (result) {
                    comment.liked = true;
                    comment.likesCount++;
                    Notifications.success("Successfully liked comment");
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var unlikePostComment = function (post, comment) {
            return CurrentUserQueryExecutor.unlikeComment(post.id, comment.id)
                .then(function (result) {
                    comment.liked = false;
                    comment.likesCount--;
                    Notifications.success("Successfully unliked comment");
                }, function (error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var editPost = function(post, postText) {
            if (postText === "" || postText === undefined) {
                Notifications.error("Post content cannot be empty");
            } else {
                var editedPost = {
                    postContent: postText
                };

                return CurrentUserQueryExecutor.editPost(post.id, editedPost)
                    .then(function(result) {
                        post.postContent = postText;
                        Notifications.success("Successfully edited post");
                    }, function(error) {
                        Notifications.error(error.data["message"]);
                    });
            }
        }

        var deletePost = function(post) {
            return CurrentUserQueryExecutor.deletePost(post.id)
                .then(function(result) {
                    var index = $scope.newsFeedPosts.indexOf(post);
                    $scope.newsFeedPosts.splice(index, 1);
                    Notifications.success("Successfully deleted post");
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var editComment = function(post, comment, commentText) {
            if (commentText === "" || commentText === undefined) {
                Notifications.error("Comment text cannot be empty");
            } else {
                var editedComment = {
                    commentContent: commentText
                };

                return CurrentUserQueryExecutor.editComment(post.id, comment.id, editedComment)
                    .then(function (result) {
                        comment.commentContent = commentText;
                        Notifications.success("Successfully edited comment");
                    }, function(error) {
                        Notifications.error(error.data["message"]);
                    });
            }
        }

        var removeComment = function(post, comment) {
            return CurrentUserQueryExecutor.getAllPostComments(post.id)
                .then(function(result) {
                    post.comments = result.data;
                    post.totalCommentsCount--;
                    if (post.comments.length > 3) {
                        post.comments.splice(3, post.comments.length - 1);
                    } else if (post.comments.length === 3) {
                        post.hidableComments = false;
                    }
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var deleteComment = function(post, comment) {
            return CurrentUserQueryExecutor.deleteComment(post.id, comment.id)
                .then(function (result) {
                    removeComment(post, comment);
                    Notifications.success("Successfully deleted comment");
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var showLessComments = function (post) {
            post.comments.splice(3, post.comments.length - 1);
        }

        var checkPostCommentsCount = function(post) {
            return CurrentUserQueryExecutor.getAllPostComments(post.id)
                .then(function(result) {
                    if (result.data.length > 3) {
                        post.hidableComments = true;
                    } else {
                        post.hidableComments = false;
                    }
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var getAllPostComments = function(post) {
            return CurrentUserQueryExecutor.getAllPostComments(post.id)
                .then(function(result) {
                    post.comments = result.data;
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var getUserPreview = function(username) {
            return CurrentUserQueryExecutor.getUserPreviewData(username)
                .then(function(result) {
                    console.log(result);
                }, function(error) {
                    Notifications.error(error.data["messagge"]);
                });
        }

        var sendFriendRequest = function(username) {
            return CurrentUserQueryExecutor.sendFriendRequest(username)
                .then(function (result) {
                    console.log(result.data);
                    Notifications.success("Successfully send friend request");
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var getCommentAuthor = function(comment) {
            return CurrentUserQueryExecutor.getUserPreviewData(comment.author.username)
                .then(function(result) {
                    comment.author = result.data;
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        $scope.$on('friend-accepted', function () {
            getOwnFriendsPreview();
        });
        $scope.getOwnFriendsPreview = getOwnFriendsPreview;
        $scope.openSelectedUserProfile = openSelectedUserProfile;
        $scope.getNewsFeed = getNewsFeed;
        $scope.likePost = likePost;
        $scope.unlikePost = unlikePost;
        $scope.addCommentToPost = addCommentToPost;
        $scope.likePostComment = likePostComment;
        $scope.unlikePostComment = unlikePostComment;
        $scope.editPost = editPost;
        $scope.deletePost = deletePost;
        $scope.editComment = editComment;
        $scope.deleteComment = deleteComment;
        $scope.getAllPostComments = getAllPostComments;
        $scope.showLessComments = showLessComments;
        $scope.checkPostCommentsCount = checkPostCommentsCount;
        $scope.getUserPreview = getUserPreview;
        $scope.sendFriendRequest = sendFriendRequest;
        $scope.getCommentAuthor = getCommentAuthor;
    }

    module.controller('HomePageController', homePageController);
}());