(function() {
  'use strict';

  angular
  .module('TVcast.main', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('app.main', {
          url: '/', 
          views: {
            'content@app': {
              templateUrl: 'partials/main.html',
              controller: 'MainCtrl as main',
              resolve: {
                showlist: "ShowData"
              }
            }
          }
        });
    }
  ])
})();