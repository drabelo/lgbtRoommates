app.controller('ResultsController', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location) {

  $scope.results = "";

  $scope.cards = [];

  $http({
      url: "https://api.backand.com/1/query/data/getResultsNearMe",
      method: "GET",
      JSON: "true",
      params: window.objec
   }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    // $scope.results = JSON.stringify(response.data);
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      $scope.cards.push({"title": response.data[i].title, "body": response.data[i].about});
      console.log("What is cards? ", $scope.cards)
    }
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(response);
  });

}]);
