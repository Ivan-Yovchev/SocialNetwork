(function () {
    var module = angular.module('SocialNetworkApp');

    var changePasswordController = function ($scope, $rootScope, $location, CurrentUserQueryExecutor, Notifications) {
       var changePassword = function() {
           var credentials = {
               oldPassword: $scope.changePasswordOld,
               newPassword: $scope.changePasswordNew,
               confirmPassword: $scope.changePasswordConfirm
           };

           return CurrentUserQueryExecutor.changePassword(credentials)
               .then(function(result) {
                   Notifications.success(result.data['message']);
                   $location.path("/user/home");
               }, function (error) {
                   if (error.data.modelState) {
                       for (var errorMsg in error.data.modelState) {
                           Notifications.error(error.data.modelState[errorMsg][0]);
                       }
                   } else {
                       Notifications.error(error.data["message"]);
                   }
               });
       }

        $scope.changePassword = changePassword;
    }

    module.controller('ChangePasswordController', changePasswordController);
}());