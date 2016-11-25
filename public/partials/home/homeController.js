app.controller('homeCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location){

  $scope.getResults = function() {
    window.objec.Parameters.Distance = angular.element('#distance').val();
      $rootScope.loggedInUser = "lol";
      $location.path("/results");

  };


}]);
