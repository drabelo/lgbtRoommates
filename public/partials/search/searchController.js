app.controller('searchCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location){

  $scope.getResults = function() {
      $location.path("/results");

  };

  // var $results = document.querySelector('.results');
  // var appendToResult = $results.insertAdjacentHTML.bind($results, 'afterend');
  objec = null;
  TeleportAutocomplete.init('.my-input').on('change', function(value) {
    console.log("hit here");
    objec = {"Parameters" : {
      Latitude: value.latitude,
      Longitude: value.longitude,
      Distance : 20000
            }};
    // appendToResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
  });


}]);
