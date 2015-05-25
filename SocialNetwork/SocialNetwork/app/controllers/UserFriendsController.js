﻿(function() {
    var module = angular.module("SocialNetworkApp");

    var userFriendsController = function ($scope, $rootScope, $location, $routeParams, $document, CurrentUserQueryExecutor, UserQueryExecutor, Authorization, Notifications) {
        CurrentUserQueryExecutor.getFriendFriendsFull($routeParams.username)
            .then(function(result) {
                $scope.userFriends = result.data;
                console.log(result.data);
            }, function(error) {
                Notifications.error(error.data["message"]);
            });

        UserQueryExecutor.getUserFullData($routeParams.username)
            .then(function(result) {
                $scope.userName = result.data["name"];
                console.log($scope.userName);
            }, function(error) {
                Notifications.error(error.data["message"]);
            });
    }

    module.controller('UserFriendsController', userFriendsController);
}());