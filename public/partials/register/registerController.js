app.controller('RegisterCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', '$firebaseObject', function($scope, $http, $localStorage, $rootScope, $location, $firebaseObject) {
    $scope.user = {};

    $rootScope.$broadcast('turnOffDashboard');
    $rootScope.$broadcast('turnOnLogin');


$scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];

    $scope.register = function() {

        firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password).
        then(authData => {
          console.log("Registered");
            console.log(authData)


            firebase.database().ref('users/' + authData.uid).set({
                email: authData.email,
                uid : authData.uid,
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName
              });

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error);
        });

        console.log("User is now registered");

    };
}]);
