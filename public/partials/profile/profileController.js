app.controller('ProfileCtrl', ['$scope', '$http', 'localStorageService', '$rootScope', '$location', function($scope, $http, localStorageService, $rootScope, $location) {
  $scope.email = firebase.auth().currentUser.email;
  $scope.name = firebase.auth().currentUser.displayName;
  $scope.uid = firebase.auth().currentUser.uid;

  $scope.cards = [];
  console.log("Current user:", localStorageService.get('currentUser'));
  $scope.name = localStorageService.get('currentUser').firstName + " " + localStorageService.get('currentUser').lastName;


  $http ({
   method: 'GET',
   url: 'https://api.backand.com/1/query/data/getMyListings',
   params: {
     parameters: {
       values: firebase.auth().currentUser.uid
     }
   }
  }).then(function successCallback(response) {
      console.log("Success", response)

      for (var i = 0; i < response.data.length; i++) {

        var image = null;
        try{
          image = response.data[i].photos.split(",")[0]
        }catch(e){
          image = response.data[i].photos
        }
        $scope.cards.push({"title": response.data[i].title, "body": response.data[i].about, "image" : image, "id" : response.data[i].id, "ownerId" : response.data[i].uid});
        console.log("What is cards? ", $scope.cards)
      }

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("Nooo", response)

    });

      $scope.goToRoom = function(info) {
        $rootScope.room = info;
        $location.path("/roomDetails");
      }

}]);
