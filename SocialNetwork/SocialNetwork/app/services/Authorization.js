(function () {
    var module = angular.module('SocialNetworkApp');

    var Authorization = function ($http, Session, rootUrl) {
        var getHeaders = function () {
            var headers = {
                headers: {
                    'Authorization': "Bearer " + Session.getUser().access_token
                }
            };

            return headers;
        }

        var login = function (credentials) {
            var user = {
                username: credentials.username,
                password: credentials.password
            };

            return $http.post(rootUrl + "users/login", user)
                .then(function(result) {
                    Session.createUser(result.data);
                    return result;
                });
        }

        var logout = function () {
            return $http.post(rootUrl + "users/logout", null, getHeaders())
                .then(function (data) {
                    Session.removeUser();
                    return data;
                });
        }

        var getUser = function () {
            return Session.getUser();
        }

        var isLogged = function () {
            return !!Session.getUser();
        }


        return {
            getHeaders: getHeaders,
            login: login,
            logout: logout,
            getUser: getUser,
            isLogged: isLogged
        };
    }

    module.factory('Authorization', Authorization);
}());