app.controller('RegisterCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location) {
    $scope.user = {};

    $rootScope.$broadcast('turnOffDashboard');
    $rootScope.$broadcast('turnOnLogin');

    $scope.register = function() {

      firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(error);
        });

        console.log("User is now registered");

    };
}]);
