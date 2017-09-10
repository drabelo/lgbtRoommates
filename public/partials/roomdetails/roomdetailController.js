app.controller('RoomDetailsCtrl', ['$scope', '$http', 'localStorageService', '$rootScope', '$location', '$firebaseObject', function($scope, $http, localStorageService, $rootScope, $location, $firebaseObject) {


if($rootScope.room == null){
  $location.path("/index");
}

$scope.title = $rootScope.room.title;
$scope.about = $rootScope.room.body;
$scope.image = $rootScope.room.image;

$http ({
  method: 'GET',
  url: 'https://api.backand.com/1/query/data/getUser',
  params: {
    parameters: {
      uid: $rootScope.room.ownerId,
    }
  }
}).then(function successCallback(response) {
  console.log("SUCCESFULLY FOUND USER", response.data[0]);
  $scope.name = response.data[0].firstName + " " + response.data[0].lastName;
  $scope.email = response.data[0].email;
}, function errorCallback(response) {
    console.log(response);
});

$scope.name = localStorageService.get('currentUser').firstName + " " + localStorageService.get('currentUser').lastName;
$scope.email = localStorageService.get('currentUser').email;
console.log($scope.room);


$scope.showDelete = false;
$scope.showMessaging = true;

console.log($rootScope.room.ownerId);
console.log(firebase.auth().currentUser.uid);

if($rootScope.room.ownerId === firebase.auth().currentUser.uid){
  $scope.showDelete = true;
  $scope.showMessaging = false;
}

console.log("What is rootScope," , $rootScope.room);

$scope.message = function() {

    $location.path("/messaging");
};

$scope.delete = function() {

  $http ({
    method: 'DELETE',
    url: "https://api.backand.com:443/1/objects/room/" + $rootScope.room.id
  }).then(function successCallback(response) {
   // this callback will be called asynchronously
   // when the response is available
   console.log("SUCESS DELETEING");
  }, function errorCallback(response) {
   // called asynchronously if an error occurs
   // or server returns response with an error status.
   console.log(response);
  });
};


}]);
