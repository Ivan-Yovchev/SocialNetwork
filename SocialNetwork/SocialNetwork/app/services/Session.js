(function() {
    var module = angular.module('SocialNetworkApp');

    var Session = function($cookieStore, $rootScope) {
        
        var createUser = function(user) {
            $cookieStore.put('user', user);
        }

        var removeUser = function() {
            $cookieStore.remove('user');
        }

        var getUser = function() {
            return $cookieStore.get('user');
        }

        return {
            createUser: createUser,
            removeUser: removeUser,
            getUser: getUser
        };
    }

    module.factory('Session', Session);
}());