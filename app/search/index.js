(function() {
  'use strict';

  angular
  .module('TVcast.search', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('app.search', {
          url: '/search', 
          views: {
            'content@app': {
              templateUrl: 'partials/search.html',
              controller: 'SearchCtrl as search'
              // resolve: {
              //   showlist: "ShowData"
              // }
            }
          }
        })
        .state('app.search2', {
          url: '/search2', 
          views: {
            'content@app': {
              templateUrl: 'partials/search2.html',
              controller: 'SearchCtrl as search2'
              // resolve: {
              //   showlist: "ShowData"
              // }
            }
          }
        });
    }
  ]);
})();