(function() {
    var module = angular.module('SocialNetworkApp');

    var registerController = function ($scope, $rootScope, $location, UserQueryExecutor, Authorization, Notifications) {
        $scope.attemptRegister = function() {
            var user = {
                username: $scope.registerUsername,
                password: $scope.registerPassword,
                confirmPassword: $scope.registerConfirmPassword,
                name: $scope.registerName,
                email: $scope.registerEmail,
                gender: $scope.registerGender
            };

            UserQueryExecutor.registerUser(user)
                .then(function(result) {
                    console.log(result.data);
                    var credentials = {
                        username: user.username,
                        password: user.password
                    };

                    Authorization.login(credentials)
                        .then(function() {
                            $rootScope.username = Authorization.getUser();
                            $location.path("/user/home");
                            Notifications.success("User account created");
                        });
                }, function(error) {
                    for (var errorMsg in error.data.modelState) {
                        Notifications.error(error.data.modelState[errorMsg][0]);
                    }
                });
        }
    }

    module.controller('RegisterController', registerController);
}());