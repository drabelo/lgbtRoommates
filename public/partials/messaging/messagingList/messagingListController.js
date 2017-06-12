visitingMessage = null;
app.controller('MessagingListCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', 'Backand',function($scope, $http, $localStorage, $rootScope, $location, Backand) {
  $scope.cards = [];

  $scope.todos = [];

  $http ({
    method: 'GET',
    url: Backand.getApiUrl() + '/1/query/data/getMessagesPerson',
    params: {
      parameters: {
        uid: firebase.auth().currentUser.uid
      }
    }
  }).then(function successCallback(response) {
   // this callback will be called asynchronously
   // when the response is available
   $scope.results = JSON.stringify(response.data);

   for (var i = 0; i < response.data.length; i++) {

     if(response.data[i].person1 != firebase.auth().currentUser.uid) {
        $scope.todos.push({"who" : response.data[i].person1, "person1": response.data[i].person1, "person2": response.data[i].person2, "data" : response.data[i].data, "ConvoId" : response.data[i].id, "roomId" : response.data[i].roomId})
      } else if(response.data[i].person2 != firebase.auth().currentUser.uid){
        $scope.todos.push({"who" : response.data[i].person2, "person1": response.data[i].person1, "person2": response.data[i].person2, "data" : response.data[i].data, "ConvoId" : response.data[i].id, "roomId" : response.data[i].roomId})
      }
   }
  }, function errorCallback(response) {
   // called asynchronously if an error occurs
   // or server returns response with an error status.
   console.log(response);
  });

  $scope.goToMessage = function(info) {
    console.log("hit here ", info);
    $rootScope.room = info;
    $location.path("/messaging");
  }



}]);
