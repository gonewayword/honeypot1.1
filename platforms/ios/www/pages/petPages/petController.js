/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.pet', [])
  .controller('PetCtrl', function ($scope, $rootScope, $http, Pet) {
    $scope.bearTouch = Pet.bearTouch;
    console.log($rootScope.pet, 'root pet')
    Pet.bearGrow();
    Pet.setBackground();
    Pet.getStats()
      .then(res => {
        $scope.stats = res;
        if ($scope.stats.progress >= 100) {
          $scope.stats.hunger = 100;
          $scope.stats.happiness = 100;
        }
      });
    $scope.showHelp = () => Pet.showHelp();
  });
