app.controller('homeCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location){

  $scope.getResults = function() {
    window.objec.Parameters.Distance = angular.element('#distance').val();
      $rootScope.loggedInUser = "lol";
      $location.path("/results");

  };

  $scope.query = "";
$scope.paOptions = {
  updateModel : true
};
$scope.paTrigger = {};
$scope.paDetails = {};
$scope.placesCallback = function (error, details) {
        console.log($scope.query);
  if (error) {
    return console.error(error);
  }
  $scope.paDetails = details;
};


}]);
