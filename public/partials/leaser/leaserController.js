app.controller('leaserCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location) {

  $scope.listPlace = function() {

    var array = [window.objec.Parameters.Latitude, window.objec.Parameters.Longitude];

    var room = {
      title : angular.element('#title').val(),
      about : angular.element('#about').val(),
      location : array
    }
    console.log(room);

    $http({
      method: 'POST',
      url : "https://api.backand.com/1/objects/room",
      data: room,
    }).then(function successCallback(response) {
     // this callback will be called asynchronously
     // when the response is available
     $scope.results = JSON.stringify(response.data);
     console.log(response);
   }, function errorCallback(response) {
     // called asynchronously if an error occurs
     // or server returns response with an error status.
     console.log(response);
   });

  };


}]);
