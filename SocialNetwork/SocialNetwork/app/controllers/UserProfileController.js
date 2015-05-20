(function () {
    var module = angular.module('SocialNetworkApp');

    var userProfileController = function ($scope, $rootScope, $location, $routeParams, UserQueryExecutor, CurrentUserQueryExecutor, Authorization, Notifications) {
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
                    //console.log($scope.user);
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

        $scope.showUserProfile = showUserProfile;
        $scope.selectedUserUsername = $routeParams.username;
        $scope.sendFriendRequest = sendFriendRequest;
        showUserProfile($scope.selectedUserUsername);
    }

    module.controller('UserProfileController', userProfileController);
}());