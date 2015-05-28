(function() {
    var module = angular.module("SocialNetworkApp");

    var userFriendsController = function ($scope, $location, $routeParams, CurrentUserQueryExecutor, Notifications) {
        CurrentUserQueryExecutor.getFriendFriendsFull($routeParams.username)
            .then(function(result) {
                $scope.userFriends = result.data;
            }, function (error) {
                $location.path("/users/" + $routeParams.username);
                Notifications.error(error.data["message"]);
            });

        CurrentUserQueryExecutor.getUserFullData($routeParams.username)
            .then(function(result) {
                $scope.userName = result.data["name"];
            }, function(error) {
                Notifications.error(error.data["message"]);
            });

        var selectFriend = function (username) {
            $location.path("/users/" + username);
        }

        $scope.selectFriend = selectFriend;
    }

    module.controller('UserFriendsController', userFriendsController);
}());