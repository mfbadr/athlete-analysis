(function(){
  'use strict';

  angular.module('athlete-analysis')
  .controller('HomeCtrl', ['$scope', '$state', 'Athlete', function($scope, $state, Athlete){
    $scope.results = undefined;

    $scope.submit = function(){
      $scope.results = 'loading';
      //alert($scope.athlete);
      Athlete.getResults($scope.athlete).then(function(response){
        //success
        var last = 0,
            resultsArray = response.data.data;

      debugger;

        for(var i = 0; i < resultsArray.length; i++){
          if(resultsArray[i].docSentiment && resultsArray[i].docSentiment.score){
            last += parseFloat(resultsArray[i].docSentiment.score);
          }
        }
        //

        debugger;
        response.data.averageSentiment = last / resultsArray.length;
        debugger;
        $scope.results = response.data;
      }, function(response){
        //failure
        console.log(response);
      });
    };

  }]);
})();

