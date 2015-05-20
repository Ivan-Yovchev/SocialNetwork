(function () {
    var module = angular.module('SocialNetworkApp');

    var loginController = function ($scope, $rootScope, $location, Authorization, Notifications) {
        function attemptLogin(credentials) {
            Authorization.login(credentials)
                .then(function(result) {
                    $rootScope.user = Authorization.getUser();
                    $location.path("/user/home");
                }, function(error) {
                    Notifications.error(error.data["error_description"]);
                });
        }

        $scope.attemptLogin = attemptLogin;
    }

    module.controller('LoginController', loginController);
}());