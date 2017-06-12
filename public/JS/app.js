var app = angular.module("MyApp", ['ngRoute', 'ngMaterial', 'backand', 'ngStorage', 'ngIdle', 'firebase']).
config(function($routeProvider, $locationProvider, BackandProvider) {
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
    when("/roomDetails", {
        templateUrl: "partials/roomdetails/roomdetails.html",
        controller: "RoomDetailsCtrl"
    }).
    when("/messageList", {
        templateUrl: "partials/messaging/messagingList/messagingList.html",
        controller: "MessagingListCtrl"
    }).
    when("/profile", {
        templateUrl: "partials/profile/profile.html",
        controller: "ProfileCtrl"
    }).
    when("/dashboard", {
        templateUrl: "partials/dashboard/dashboard.html",
        controller: "DashCtrl"
    }).
    when("/messaging", {
        templateUrl: "partials/messaging/messaging.html",
        controller: "MessagingCtrl"
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


}).
run(function($rootScope, $location) {
  console.log("hit here1");
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      console.log("hit here2");

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          $rootScope.showLogin = false;
          $rootScope.showLogout = true;
          $rootScope.showRegister = false;
          $rootScope.showMessages = true;
          $rootScope.showProfile = true;
          console.log("User is logged in");
        } else {
          $rootScope.showLogin = true;
          $rootScope.showRegister = true;
          $rootScope.showLogout = false;
          $rootScope.showMessages = false;
          $rootScope.showProfile = false;
          console.log("User is logged out");
        }

        if (firebase.auth().currentUser == null) {
          $rootScope.showLogin = true;
          $rootScope.showRegister = true;
            // no logged user, redirect to /login
            if (next.templateUrl === "partials/home/home.html") {

            } else if(next.templateUrl === "partials/register/register.html"){

            }else {
                $location.path("/login");
            }
        } else {

          if (next.templateUrl === "partials/login/login.html") {
            $location.path("/index");
          } else if (next.templateUrl === "partials/register/register.html") {
            $location.path("/index");
        }
        }


      });

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
