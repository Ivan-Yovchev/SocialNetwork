(function() {
    var app = angular.module("SocialNetworkApp", ["ngRoute", "ngCookies"]);

    // define the root url for the services
    // to be used across all controllers
    app.value('rootUrl', 'http://softuni-social-network.azurewebsites.net/api/');

    app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "./views/main.html"
            })
            .when("/login", {
                templateUrl: "./views/login-form.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "./views/register-form.html",
                controller: "RegisterController"
            })
            .when("/user/home", {
                templateUrl: "./views/home-page.html",
                resolve: { loginRequired: loginRequired }
            })
            .when("/profile/password", {
                templateUrl: "./views/change-password.html",
                controller: "ChangePasswordController",
                resolve: { loginRequired: loginRequired }
            })
            .when("/profile", {
                templateUrl: "./views/edit-profile.html",
                resolve: { loginRequired: loginRequired }
            })
            .otherwise({ redirectTo: "/" });
    });

    var loginRequired = function ($location, $q, Authorization) {
        var deferred = $q.defer();

        if (Authorization.isLogged() === false) {
            deferred.reject();
            $location.path('/login');
        }
    }
}());