(function(){
  'use strict';

  angular.module('athlete-analysis')
  .factory('Athlete', ['$rootScope', '$http', function($rootScope, $http){

    function getResults(athleteName){
      console.log('getting results for ', athleteName);
      return $http.post('/results', {athleteName:athleteName});
    }

    return {getResults: getResults};
  }]);
})();
