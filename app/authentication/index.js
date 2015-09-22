(function() {
  'use strict';

  angular
  .module('TVcast.authentication', [
    'ui.router',
    'firebase'
  ]);
  // .config(['$stateProvider', '$urlRouterProvider', 
  //   function($stateProvider, $urlRouterProvider){
  //     $stateProvider
  //       .state('login', {
  //         url: '/', 
  //         templateUrl: 'partials/login.html',
  //         controller: 'SecurityCtrl as security'
  //       });
  //   }
  // ])
})();