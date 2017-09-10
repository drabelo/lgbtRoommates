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

            //register in backand database
            var user = {
              email : authData.email,
              firstName : $scope.user.firstName,
              lastName : $scope.user.lastName,
              uid : authData.uid
            }
            console.log("HIT HIT");

            $http({
              method: 'POST',
              url : "https://api.backand.com/1/objects/users",
              data: user,
            }).then(function successCallback(response) {
             // this callback will be called asynchronously
             // when the response is available
             console.log("Registed in backand", response);
             $scope.results = JSON.stringify(response.config.data);
           }, function errorCallback(response) {
             // called asynchronously if an error occurs
             // or server returns response with an error status.
             console.log("Failed to resgiter in backand", response);
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
