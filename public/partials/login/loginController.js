app.controller('LoginCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location) {
    $scope.user = {};

    $rootScope.$broadcast('turnOffDashboard');
    $rootScope.$broadcast('turnOnLogin');

    $scope.login = function() {
        firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(snapshot) {
          console.log("User is now logged in " + firebase.auth().currentUser);

          $location.path("/search");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    };
}]);
