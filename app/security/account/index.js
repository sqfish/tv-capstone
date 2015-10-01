(function() {
  'use strict';

  angular
  .module('TVcast.account', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('app.account', {
          url: '/account', 
          views: {
            'content@app': {
              templateUrl: 'partials/account.html',
              controller: 'AccountCtrl as account'
            }
          }
        });
    }
  ]);
})();