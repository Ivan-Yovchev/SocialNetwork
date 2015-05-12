(function() {
    var module = angular.module('SocialNetworkApp');

    var registerController = function ($scope, $rootScope, $location, UserQueryExecutor, Authorization, Notifications) {
        $scope.attemptRegister = function() {
            var user = {
                username: $scope.registerUsername,
                password: $scope.registerPassword,
                confirmPassword: $scope.registerConfirmPassword,
                name: $scope.registerName,
                email: $scope.registerEmail
            };

            UserQueryExecutor.registerUser(user)
                .then(function(data) {
                    console.log(data);
                    var credentials = {
                        username: user.username,
                        password: user.password
                    };

                    Authorization.login(credentials)
                        .then(function() {
                            $rootScope.username = Authorization.getUser();
                            $location.path("/user/home");
                        });

                    Notifications.success("User account created");
                }, function(error) {
                    Notifications.error(error["message"]);
                });
        }
    }

    module.controller('RegisterController', registerController);
}());