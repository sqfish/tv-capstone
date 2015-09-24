(function() {
  'use strict';

  angular
  .module('TVcast.home', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('app.home', {
          url: '/home', 
          views: {
            'content@app': {
              templateUrl: 'partials/home.html',
              controller: 'HomeCtrl as home'
              // resolve: {
              //   showlist: "ShowData"
              // }
            }
          }
        });
    }
  ]);
})();