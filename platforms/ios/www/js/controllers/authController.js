angular.module('auth', [])

.controller('AuthController', function($scope, $location, $http, $rootScope) {

  $scope.user = {
    grant_type: 'password'
  };

  $scope.logo = './img/honeypot_stolen_logo.png'

  $scope.login = function() {
    $http.post('http://localhost:3000/v1/access_tokens', $scope.user)
      .then(function(res) {
        $rootScope.user = res.data.data[0].user_id;
        $location.path('/app/pet');
      }, function(err) {
        console.log(err);
      });
  };

  $scope.goToSignup = function() {
    $location.path('/signup');
  };

  $scope.signup = function() {
    $http.post('http://localhost:3000/users', $scope.user)
      .then(function(res) {
        $http.post('http://localhost:3000/v1/access_tokens', $scope.user)
          .then(function(res) {
            $rootScope.user = res.data.data[0].user_id;
            $location.path('/bankAuth');
          }, function(err) {
            console.log(err);
          });
      }, function(err) {
        console.log(err);
      });
  };

})

// $location.path('/app/pet')