app.controller('LoginCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location) {
    $scope.user = {};

    $rootScope.$broadcast('turnOffDashboard');
    $rootScope.$broadcast('turnOnLogin');

    $scope.login = function() {
console.log("here");
        firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        console.log("User is now logged in");
        $rootScope.loggedInUser = $scope.user.email;
        $rootScope.$broadcast('turnOnDashboard');
        $rootScope.$broadcast('turnOffLogin');
        $rootScope.$broadcast('turnOnLogout');
        $location.path("/search");
    };
}]);
