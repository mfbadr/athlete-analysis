(function(){
  'use strict';

  angular.module('athlete-analysis')
  .factory('Athlete', ['$rootScope', '$http', function($rootScope, $http){

    function getResults(athleteName){
      return $http.post('/results', {athleteName:athleteName});
    }

    return {getResults: getResults};
  }]);
})();
