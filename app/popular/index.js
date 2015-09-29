(function() {
  'use strict';

  angular
  .module('TVcast.popular', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('app.popular', {
          url: '/popular', 
          views: {
            'content@app': {
              templateUrl: 'partials/popular.html',
              controller: 'PopularCtrl as popular'
              // resolve: {
              //   showlist: "ShowData"
              // }
            }
          }
        });
    }
  ]);
})();