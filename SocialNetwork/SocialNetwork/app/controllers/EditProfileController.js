(function () {
    var module = angular.module('SocialNetworkApp');

    var editProfileController = function ($scope, $location, CurrentUserQueryExecutor, Notifications) {
        CurrentUserQueryExecutor.getUser()
            .then(function(result) {
                $scope.me = result.data;

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

        var clickUploadProfileImage = function() {
            $("#select-profile-image").click();
        };

        var clickUploadBackgroundImage = function () {
            $("#select-bg-image").click();
        };

        var uploadProfileImage = function (element) {
            var file = element.files[0];
            var MAX_FILE_SIZE = 128000;
            if (file.size <= MAX_FILE_SIZE) {
                var reader = new FileReader();
                reader.onload = function () {
                    $('#image .caption').text(file.name);
                    $('.profile-image img').attr('src', reader.result);
                    $('.profile-image img').attr('ng-src', reader.result);
                    $scope.me.profileImageData = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                Notifications.error("Size limit: 128kb");
            }
        };

        var uploadBackgroundImage = function (element) {
            var file = element.files[0];
            var MAX_FILE_SIZE = 1024000;
            if (file.size <= MAX_FILE_SIZE) {
                var reader = new FileReader();
                reader.onload = function () {
                    $('#other-info .caption').text(file.name);
                    $('.background-image img').attr('src', reader.result);
                    $('.background-image img').attr('ng-src', reader.result);
                    $scope.me.coverImageData = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                Notifications.error("Size limit: 1024kb");
            }
        };

        var saveChanges = function() {
            var user = {
                name: $scope.me.name,
                email: $scope.me.email,
                profileImageData: $scope.me.profileImageData,
                coverImageData: $scope.me.coverImageData
            };

            if ($scope.selectMale !== undefined) {
                user.gender = "male";
            } else if ($scope.selectFemale !== undefined) {
                user.gender = "female";
            } else if ($scope.selectOther !== undefined) {
                user.gender = "other";
            } else {
                if ($scope.male) {
                    user.gender = "male";
                } else if ($scope.female) {
                    user.gender = "female";
                } else if ($scope.other) {
                    user.gender = "other";
                }
            }

            console.log(user);

            return CurrentUserQueryExecutor.editProfile(user)
                .then(function(result) {
                    Notifications.success(result.data["message"]);
                    $location.path("/user/home");
                }, function(error) {
                    Notifications.error(error.data["message"]);
                });
        }

        $scope.clickUploadProfileImage = clickUploadProfileImage;
        $scope.uploadProfileImage = uploadProfileImage;
        $scope.clickUploadBackgroundImage = clickUploadBackgroundImage;
        $scope.uploadBackgroundImage = uploadBackgroundImage;
        $scope.saveChanges = saveChanges;
    }

    module.controller('EditProfileController', editProfileController);
}());