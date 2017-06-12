function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
}

app.controller('leaserCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location, backand) {

  var photos = [];


  //
  // $scope.user = {
  //   title: 'Developer',
  //   email: 'ipsum@lorem.com',
  //   firstName: '',
  //   lastName: '',
  //   company: 'Google',
  //   address: '1600 Amphitheatre Pkwy',
  //   city: 'Mountain View',
  //   state: 'CA',
  //   biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
  //   postalCode: '94043'
  // };

  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
  'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
  'WY').split(' ').map(function(state) {
      return {abbrev: state};
    });

  var $results = document.querySelector('.results');
  var appendToResult = $results.insertAdjacentHTML.bind($results, 'afterend');
  settingRoom = null;
  TeleportAutocomplete.init('.my-input').on('change', function(value) {
    settingRoom = {"Parameters" : {
      Latitude: value.latitude,
      Longitude: value.longitude
    }};

    appendToResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
  });



  $scope.listPlace = function() {

    var array = [window.settingRoom.Parameters.Latitude, window.settingRoom.Parameters.Longitude];

    var title = $scope.room.title;
    var about = $scope.room.about;

    var room = {
      title : title,
      about : about,
      location : array,
      photos : photos.toString(),
      uid : firebase.auth().currentUser.uid
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
     $location.path("/profile");
   }, function errorCallback(response) {
     // called asynchronously if an error occurs
     // or server returns response with an error status.
     console.log(response);
   });

  };



  // Create a server side action in backand
  // Go to any object's actions tab
  // and click on the Backand Storage icon.
  // Backand consts:
  var baseUrl = 'https://api.backand.com/1/objects/room';
  var baseActionUrl = baseUrl + 'action/'
  var objectName = 'room';
  var filesActionName = 'files';

  // Display the image after upload
  $scope.imageUrl = null;

  // Store the file name after upload to be used for delete
  $scope.filename = null;

  // input file onchange callback
  function imageChanged(fileInput) {

    //read file content
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      upload(file.name, e.currentTarget.result).then(function(res) {

        $scope.imageUrl = res.data.url;
        $scope.filename = file.name;
        console.log("HIT HERE");
      }, function(err){
        alert(err.data);
      });
    };

    reader.readAsDataURL(file);
  };

  // register to change event on input file
  function initUpload() {
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
      imageChanged(fileInput);
    });
  }

   // call to Backand action with the file name and file data
  function upload(filename, filedata) {
    // By calling the files action with POST method in will perform
    // an upload of the file into Backand Storage

    console.log("What is totals? ", photos);
    return $http({
      method: 'POST',
      url : "https://api.backand.com/1/objects/action/room/?",
      params:{
        "name": filesActionName
      },
      headers: {
        'Content-Type': 'application/json'
      },
      // you need to provide the file name and the file data
      data: {
        "filename": filename,
        "filedata": filedata.substr(filedata.indexOf(',') + 1, filedata.length) //need to remove the file prefix type
      }
    }).then(function successCallback(response) {
     console.log("1",response)
     photos.push(response.data.url);

   }, function errorCallback(response) {
     console.log("2",response)
   });
  };

  $scope.deleteFile = function(){
    if (!$scope.filename){
      alert('Please choose a file');
      return;
    }
    // By calling the files action with DELETE method in will perform
    // a deletion of the file from Backand Storage
    $http({
      method: 'DELETE',
      url : "https://api.backand.com/1/objects/action/room/1?",
      params:{
        "name": filesActionName
      },
      headers: {
        'Content-Type': 'application/json'
      },
      // you need to provide the file name
      data: {
        "filename": $scope.filename
      }
    }).then(function(response){
      // Reset the form
      console.log(response)
      $scope.imageUrl = null;
      document.getElementById('fileInput').value = "";
    })
  }

  $scope.initCtrl = function() {
    initUpload();
  }





}]).config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });
