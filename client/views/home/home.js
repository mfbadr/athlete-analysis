(function(){
  'use strict';

  angular.module('athlete-analysis')
  .controller('HomeCtrl', ['$scope', '$state', 'Athlete', function($scope, $state, Athlete){
    $scope.results = undefined;

    $scope.submit = function(){
      $scope.results = 'loading';
      Athlete.getResults($scope.athlete).then(function(response){
        //success
        var last = 0,
            resultsArray = response.data.data;

        for(var i = 0; i < resultsArray.length; i++){
          if(resultsArray[i].docSentiment && resultsArray[i].docSentiment.score){
            last += parseFloat(resultsArray[i].docSentiment.score);
          }
        }

        response.data.averageSentiment = last / resultsArray.length;
        $scope.results = response.data;
      }, function(response){
        //failure
        console.log(response);
      });
    };

  }]);
})();

