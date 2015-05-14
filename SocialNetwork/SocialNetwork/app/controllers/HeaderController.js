(function() {
    var module = angular.module('SocialNetworkApp');

    var headerController = function ($scope, $rootScope, $location, CurrentUserQueryExecutor, Authorization, Notifications) {
        CurrentUserQueryExecutor.getUser()
            .then(function(result) {
                $scope.username = result.data["username"];
                if (result.data["profileImageData"] == null) {
                    $scope.image = false;
                } else {
                    $scope.image = true;
                    $scope.profileImageData = result.data["profileImageData"];
                }
            }, function(error) {
                Notifications.error(error);
            });

        var logout = function() {
            Authorization.logout()
                .then(function(result) {
                    Notifications.success("Successfully logged out");
                    $location.path("/login");
                }, function(error) {
                    Notifications.error(error);
                });
        }

        var changePasswordView = function () {
            $location.path("/profile/password");
        }

        var editProfileView = function () {
            $location.path("/profile");
        }

        $scope.logout = logout;
        $scope.changePasswordView = changePasswordView;
        $scope.editProfileView = editProfileView;
    }

    module.controller('HeaderController', headerController);
}());