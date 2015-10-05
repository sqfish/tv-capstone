(function() {
  'use strict';

  angular
  .module('TVcast.dashboard', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('app.dashboard', {
          url: '/dashboard', 
          views: {
            'content@app': {
              templateUrl: 'partials/dashboard.html',
              controller: 'CalendarCtrl as cal'
              // resolve: {
              //   showlist: "ShowData"
              // }
            }
          }
        });
    }
  ]);
})();