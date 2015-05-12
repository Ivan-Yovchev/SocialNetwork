(function() {
    var module = angular.module('SocialNetworkApp');

    var Notifications = function($http, rootUrl) {
        var success = function(message) {
            noty({
                text: message,
                type: 'success',
                layout: 'topCenter',
                timeout: 3000
            });
        }

        var error = function(message) {
            noty({
                text: message,
                type: 'error',
                layout: 'topCenter',
                timeout: 3000
            });
        }

        return {
            success: success,
            error: error
        };
    }

    module.factory("Notifications", Notifications);
}());