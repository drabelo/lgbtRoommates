app.controller('LoginCtrl', ['$scope', '$http', 'localStorageService', '$rootScope', '$location', function($scope, $http, localStorageService, $rootScope, $location) {
    $scope.user = {};

    $rootScope.$broadcast('turnOffDashboard');
    $rootScope.$broadcast('turnOnLogin');

    $scope.login = function() {
        firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(snapshot) {
          console.log("User is now logged in ", firebase.auth().currentUser);

          //retreiving user info
          $http ({
            method: 'GET',
            url: 'https://api.backand.com/1/query/data/getUser',
            params: {
              parameters: {
                uid: firebase.auth().currentUser.uid,
              }
            }
          }).then(function successCallback(response) {
            console.log("SUCCESFULLY FOUND USER", response.data[0]);
            $rootScope.currentUser = response.data[0];
            localStorageService.set("currentUser", response.data[0]);
          }, function errorCallback(response) {
              console.log(response);
          });

          $location.path("/search");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    };
}]);
