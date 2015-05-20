(function () {
    var module = angular.module('SocialNetworkApp');

    var homePageController = function ($scope, $rootScope, $location, $document, CurrentUserQueryExecutor, Authorization, Notifications) {
        var getOwnFriendsPreview = function() {
            return CurrentUserQueryExecutor.getOwnFriendsPreview()
                .then(function(result) {
                    $scope.friendsCount = result.data["totalCount"];
                    $scope.friends = result.data["friends"];
                    console.log(result);
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }
        getOwnFriendsPreview();

        var openSelectedUserProfile = function (username) {
            $location.path("/users/" + username);
        }

        $scope.$on('friend-accepted', function () {
            getOwnFriendsPreview();
        });
        $scope.getOwnFriendsPreview = getOwnFriendsPreview;
        $scope.openSelectedUserProfile = openSelectedUserProfile;
    }

    module.controller('HomePageController', homePageController);
}());