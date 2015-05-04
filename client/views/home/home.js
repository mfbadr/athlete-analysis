(function(){
  'use strict';

  angular.module('athlete-analysis')
  .controller('HomeCtrl', ['$scope', '$state', 'Athlete', function($scope, $state, Athlete){

    $scope.submit = function(){
      alert($scope.athlete);
      Athlete.getResults($scope.athlete).then(function(response){
        debugger;
        //success
        console.log(response);
      }, function(response){
        debugger;
        //failure
        console.log(response);
      });
    };

  }]);
})();

