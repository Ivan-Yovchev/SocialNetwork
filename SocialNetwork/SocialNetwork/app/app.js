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
                templateUrl: "./views/success.html"
            })
            .otherwise({ redirectTo: "/" });
    });
}());