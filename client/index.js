(function(){
  'use strict';

  angular.module('athlete-analysis', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home', {url:'/', abstract: true, templateUrl:'/views/home/home.html', controller: 'HomeCtrl'})
    .state('home.index', {url:''})
    //TODO: add modal popons for each substate
    //use ui-bootstrap
    .state('home.about', {url:'about'})
    .state('home.contact', {url:'contact'})
    .state('home.watson', {url:'watson'});
    $urlRouterProvider.otherwise('/');
  }]);

})();
