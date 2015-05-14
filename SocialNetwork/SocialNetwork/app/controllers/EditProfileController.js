(function () {
    var module = angular.module('SocialNetworkApp');

    var editProfileController = function ($scope, $rootScope, $location, CurrentUserQueryExecutor, Authorization, Notifications) {
        CurrentUserQueryExecutor.getUser()
            .then(function(result) {
                $scope.username = result.data["username"];
                //profile image
                if (result.data["profileImageData"] == null) {
                    $scope.profilImage = false;
                } else {
                    $scope.profilImage = true;
                    $scope.profileImageData = result.data["profileImageData"];
                }

                //cover image
                if (result.data['coverImageData'] == null) {
                    $scope.coverImage = false;
                } else {
                    $scope.coverImage = true;
                    $scope.coverImageData = result.data["coverImageData"];
                }

                $scope.name = result.data["name"];
                $scope.email = result.data["email"];
                $scope.male = false;
                $scope.female = false;
                $scope.other = false;
                if (result.data["gender"] === 0) {
                    $scope.other = true;
                } else if (result.data["gender"] === 1) {
                    $scope.male = true;
                } else {
                    $scope.female = true;
                }

            }, function(error) {
                Notifications.error(error);
            });
    }

    module.controller('EditProfileController', editProfileController);
}());