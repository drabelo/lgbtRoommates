objec = null;
app.controller('searchCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location){

  $scope.getResults = function() {
    console.log("window object", window.objec)
      $location.path("/results");

  };

  // var $results = document.querySelector('.results');
  // var appendToResult = $results.insertAdjacentHTML.bind($results, 'afterend');
  TeleportAutocomplete.init('.my-input').on('change', function(value) {
    console.log("hit here");
    objec = {"Parameters" : {
      Latitude: 42.345463,
      Longitude: -71.551628,
      Distance : 20000
            }};
    // appendToResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
  });


}]);
