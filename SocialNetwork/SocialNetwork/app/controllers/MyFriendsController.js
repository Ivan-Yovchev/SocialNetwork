(function () {
    var module = angular.module('SocialNetworkApp');

    var myFriendsController = function ($scope, $location, CurrentUserQueryExecutor, Notifications) {
        CurrentUserQueryExecutor.getUser()
            .then(function(result) {
                $scope.name = result.data["name"];
            }, function(error) {
                Notifications.error(error.data["message"]);
            });

        CurrentUserQueryExecutor.getOwnFriendsFull()
            .then(function(result) {
                $scope.numberOfFriends = result.data.length;
                $scope.allFriends = result.data;
            }, function(error) {
                Notifications.error(error.data["message"]);
            });

        var selectFriend = function(username) {
            $location.path("/users/" + username);
        }

        $scope.selectFriend = selectFriend;
    }

    module.controller('MyFriendsController', myFriendsController);
}());