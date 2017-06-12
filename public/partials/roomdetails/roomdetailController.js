app.controller('RoomDetailsCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', '$firebaseObject', function($scope, $http, $localStorage, $rootScope, $location, $firebaseObject) {


if($rootScope.room == null){
  $location.path("/index");
}

$scope.title = $rootScope.room.title;
$scope.about = $rootScope.room.body;
$scope.image = $rootScope.room.image;
$scope.uid = $rootScope.room.person2;
$scope.id = $rootScope.room.id;

console.log($scope.room);


$scope.myValue = false;

if($scope.uid === firebase.auth().currentUser.uid){
  $scope.myValue = true;
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
