(function() {
    var module = angular.module('SocialNetworkApp');

    var registerController = function ($scope, $rootScope, $location, Authorization, Notifications) {
        $scope.attemptRegister = function() {
            var user = {
                username: $scope.registerUsername,
                password: $scope.registerPassword,
                confirmPassword: $scope.registerConfirmPassword,
                name: $scope.registerName,
                email: $scope.registerEmail,
                gender: $scope.registerGender
            };

            Authorization.register(user)
                .then(function(result) {
                    $location.path("/user/home");
                    Notifications.success(result.data["message"]);
                }, function(error) {
                    for (var errorMsg in error.data.modelState) {
                        Notifications.error(error.data.modelState[errorMsg][0]);
                    }
                });
        }
    }

    module.controller('RegisterController', registerController);
}());