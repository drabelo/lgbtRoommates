app.controller('LoginCtrl', ['$scope', '$http', '$localStorage', '$rootScope', '$location', function($scope, $http, $localStorage, $rootScope, $location) {
    $scope.user = {};

    $rootScope.$broadcast('turnOffDashboard');
    $rootScope.$broadcast('turnOnLogin');

    $scope.login = function() {

        var headers = {
            username: $scope.user.email,
            password: $scope.user.password,
        };

        console.log("User is now logged in");
        $rootScope.loggedInUser = $scope.user.email;
        $rootScope.$broadcast('turnOnDashboard');
        $rootScope.$broadcast('turnOffLogin');
        $rootScope.$broadcast('turnOnLogout');
        $location.path("/dashboard");
    };
}]);
