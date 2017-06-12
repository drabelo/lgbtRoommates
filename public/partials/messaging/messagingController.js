app.controller('MessagingCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', '$firebaseObject', '$sce', function($scope, $http, $localStorage, $rootScope, $location, $firebaseObject, $sce) {

    var curUid = firebase.auth().currentUser.uid;
    $scope.user1 = {};
    console.log("init, what is person1: ", $rootScope.room)

    $scope.person1 = curUid;
    $scope.person2 = $rootScope.room.person2;
    $scope.Message = "";
    $scope.roomId = $rootScope.room.roomId;
    $scope.conversation = {};


    if($rootScope.room.person1 != curUid){
      $rootScope.room.person2 = $rootScope.room.person1;
      $rootScope.room.person1 = curUid;
    }



//Check if has had conversation before
$http ({
  method: 'GET',
  url: 'https://api.backand.com/1/query/data/getMessagesBetweenTwoPeople',
  params: {
    parameters: {
      uid1: $rootScope.room.person2 ,
      uid2: $rootScope.room.person1,
      roomId: $scope.roomId
    }
  }
}).then(function successCallback(response) {
    $scope.results = JSON.stringify(response.data);
    console.log("RESULTS" , response);
    if(response.data.length > 0) {
      console.log("EXISTS CONVERSATION");
      $scope.Message = $sce.trustAsHtml(response.data[0].data);
      $scope.conversation = response.data[0];
    }else{
      console.log("CONVERSATION DOES NOT EXIST");
      console.log($rootScope.room.person2, "   ", $rootScope.room.person1)
    }

}, function errorCallback(response) {
    console.log(response);
});




    $scope.message = function() {
      if($scope.conversation != null) {
        console.log("Conversation exists");
        conversation = $scope.conversation.data + "  " + firebase.auth().currentUser.uid + ": " + $scope.user1.input + " <br> ";

        var data = {
            person1: firebase.auth().currentUser.uid,
            person2: $rootScope.room.person2,
            data: conversation,
            roomId: $rootScope.room.roomId
        }
        $http({
            method: 'PUT',
            url: "https://api.backand.com/1/objects/messaging/" + $scope.conversation.id,
            data: data,
        }).then(function successCallback(response) {
            $scope.results = JSON.stringify(response.data);
            console.log(response);
            $scope.Message = $sce.trustAsHtml(response.config.data.data);
            $scope.conversation.data = response.config.data.data;
        }, function errorCallback(response) {
            console.log(response);
        });

      } else { //New convo!
        console.log("Conversation NEW");
        conversation = firebase.auth().currentUser.uid + ": " + $scope.user1.input + " <br> ";

        var data = {
            person1: firebase.auth().currentUser.uid,
            person2: $rootScope.room.person2,
            data: conversation,
            roomId: $rootScope.room.roomId
        }
        $http({
            method: 'POST',
            url: "https://api.backand.com/1/objects/messaging",
            data: data,
        }).then(function successCallback(response) {
            $scope.results = JSON.stringify(response.data);
            console.log(response);
            window.visitingCard = null;
            $scope.Message = $sce.trustAsHtml(response.config.data.data);
            $scope.conversation.data = response.config.data.data;
        }, function errorCallback(response) {
            console.log(response);
        });
      }

    }


}]);
