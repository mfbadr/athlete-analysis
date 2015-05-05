(function(){
  'use strict';

  angular.module('athlete-analysis')
  .controller('HomeCtrl', ['$scope', '$state', 'Athlete', function($scope, $state, Athlete){
    $scope.results = undefined;

    $scope.submit = function(){
      //alert($scope.athlete);
      Athlete.getResults($scope.athlete).then(function(response){
        //success
        console.log(response);
        $scope.results = response.data;
      }, function(response){
        //failure
        console.log(response);
      });
    };

  }]);
})();

