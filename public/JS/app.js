var app = angular.module("MyApp", ['ngRoute', 'backand', 'ngStorage', 'ngIdle', 'restangular']).
config(function($routeProvider, $locationProvider, BackandProvider, RestangularProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
    when("/index", {
        templateUrl: "partials/home/home.html",
        controller: "homeCtrl"
    }).
    when("/login", {
        templateUrl: "partials/login/login.html",
        controller: "LoginCtrl"
    }).
    when("/register", {
        templateUrl: "partials/register/register.html",
        controller: "RegisterCtrl"
    }).
    when("/dashboard", {
        templateUrl: "partials/dashboard/dashboard.html",
        controller: "DashCtrl"
    }).
    when("/leaser", {
        templateUrl: "partials/leaser/leaser.html",
        controller: "leaserCtrl"
    }).
    when("/logout", {
        templateUrl: "partials/home/home.html",
        controller: "LogoutCtrl"
    }).
    when("/search", {
        templateUrl: "partials/search/search.html",
        controller: "searchCtrl"
    }).
    when("/results", {
        templateUrl: "partials/results/results.html",
        controller: "ResultsController"
    }).
    otherwise({
        redirectTo: "partials/login/login.html",
        controller: "LoginCtrl"
    });

    BackandProvider.setAppName('lgbtroomies');
    BackandProvider.setSignUpToken('7b296064-53b4-487e-ab95-53513132bcf3');
    BackandProvider.setAnonymousToken('46720183-ffa0-4665-add8-3e899f11708b');
    RestangularProvider.setBaseUrl('https://api.backand.com/1/objects/room');


}).
run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      console.log("What is user?" ,firebase.auth().currentUser);
        if (firebase.auth().currentUser == null) {
            // no logged user, redirect to /login
            if (next.templateUrl === "partials/home/home.html") {

            } else if(next.templateUrl === "partials/register/register.html"){

            }else {
                $location.path("/login");
            }
        } else {

        }
    });
});

app.controller('EventsCtrl', function($scope, Idle, $location, $rootScope, $localStorage) {
        $scope.events = [];
        Idle.watch();

        $scope.$on('IdleTimeout', function() {
            $rootScope.doTimeout();
        });

        $rootScope.doTimeout = function() {
            Idle.watch();
            $location.path("/logout");
            console.log("Timed out - Logging out");
            Idle.unwatch()
        };

    })
    .config(function(IdleProvider, KeepaliveProvider) {
        IdleProvider.idle(3); // in seconds
        IdleProvider.timeout(5); // in seconds
        KeepaliveProvider.interval(2); // in seconds
    })
    .run(function(Idle) {
        Idle.watch();
    });


app.controller("LogoutCtrl", function($scope, $location, $rootScope, $localStorage) {
    console.log("User is logged out")

    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });

    $location.path("/index");
});
