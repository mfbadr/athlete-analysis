(function(){
  'use strict';

  angular.module('athlete-analysis', ['ui.router'])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home', {url:'/',  templateUrl:'/views/home/home.html', controller: 'HomeCtrl'});
    $urlRouterProvider.otherwise('/');
  }]);

})();
