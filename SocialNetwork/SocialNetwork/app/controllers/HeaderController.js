(function () {
    var module = angular.module('SocialNetworkApp');

    var headerController = function ($scope, $rootScope, $location, CurrentUserQueryExecutor, Authorization, Notifications) {
        CurrentUserQueryExecutor.getUser()
            .then(function(result) {
                $scope.me = result.data;
            }, function(error) {
                Notifications.error(error.data["message"]);
            });

        CurrentUserQueryExecutor.getFriendRequests()
            .then(function (result) {
                if (result.data.length === 0) {
                    $scope.hasRequests = false;
                } else {
                    $scope.hasRequests = true;
                    $scope.requestsCount = result.data.length;
                }
            }, function (error) {
                Notifications.error(error.data["message"]);
            });

        var logout = function () {
            Authorization.logout()
                .then(function (result) {
                    Notifications.success("Successfully logged out");
                    $location.path("/");
                }, function (error) {
                    Notifications.error(error);
                });
        }

        var changePasswordView = function () {
            $location.path("/profile/password");
        }

        var editProfileView = function () {
            $location.path("/profile");
        }

        var searchForUsers = function () {
            if ($scope.searchTerm !== "") {
                CurrentUserQueryExecutor.searchUsersByName($scope.searchTerm)
                    .then(function(result) {
                        $("#serach-results").show();
                        $scope.searchResults = result.data;
                        $scope.resultsCount = result.data.length;
                    }, function(error) {
                        Notifications.error(error.data['message']);
                    });
            } else {
                $("#serach-results").hide();
            }
        }

        var openSelectedUserProfile = function (username) {
            $location.path("/users/" + username);
        }

        var getFriendRequests = function () {
            if ($scope.showRequests === true) {
                $scope.showRequests = false;
            } else if ($scope.showRequests === false) {
                $scope.showRequests = true;
            } else {
                $scope.showRequests = true;
            }

            return CurrentUserQueryExecutor.getFriendRequests()
                .then(function(result) {
                    if (result.data.length != 0) {
                        $scope.friendRequests = result.data;
                        $scope.hasFriendRequests = true;
                    } else {
                        $scope.hasFriendRequests = false;
                    }
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var acceptFriendRequest = function (requestId) {
            return CurrentUserQueryExecutor.acceptRequest(requestId)
                .then(function(result) {
                    $scope.reloadRequests();
                    Notifications.success(result.data["message"]);
                    $scope.requestsCount--;
                    $scope.$emit('friend-accepted');
                    if ($scope.requestsCount === 0) {
                        $scope.hasRequests = false;
                    }
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var rejectFriendRequest = function (requestId) {
            return CurrentUserQueryExecutor.rejectRequest(requestId)
                .then(function (result) {
                    $scope.reloadRequests();
                    Notifications.success(result.data["message"]);
                    $scope.requestsCount--;
                    if ($scope.requestsCount === 0) {
                        $scope.hasRequests = false;
                    }
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        var reloadRequests = function () {
            getFriendRequests();
            $scope.showRequests = true;
        }

        var opendNewsFeed = function() {
            $location.path("/user/home");
        }

        $scope.logout = logout;
        $scope.changePasswordView = changePasswordView;
        $scope.editProfileView = editProfileView;
        $scope.searchForUsers = searchForUsers;
        $scope.openSelectedUserProfile = openSelectedUserProfile;
        $scope.getFriendRequests = getFriendRequests;
        $scope.acceptFriendRequest = acceptFriendRequest;
        $scope.rejectFriendRequest = rejectFriendRequest;
        $scope.reloadRequests = reloadRequests;
        $scope.opendNewsFeed = opendNewsFeed;
    }

    module.controller('HeaderController', headerController);
}());