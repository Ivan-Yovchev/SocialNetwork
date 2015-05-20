(function () {
    var module = angular.module('SocialNetworkApp');

    var friendsController = function ($scope, $rootScope, $location, $document, CurrentUserQueryExecutor, Authorization, Notifications) {
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
                //console.log(result);
            }, function(error) {
                Notifications.error(error.data["message"]);
            });

        var selectFriend = function(username) {
            $location.path("/users/" + username);
        }

        $scope.selectFriend = selectFriend;
    }

    module.controller('FriendsController', friendsController);
}());