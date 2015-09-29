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
        });
    }
  ]);
})();