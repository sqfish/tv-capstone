(function() {
  'use strict';

  angular
  .module('TVcast.episodes', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('app.episodes', {
          url: '/episodes', 
          views: {
            'content@app': {
              templateUrl: 'partials/episodes.html',
              controller: 'EpisodeCtrl as episode',
              resolve: {
                'currentAuth': ['fbAuthorization', function(fbAuthorization) {
                  return fbAuthorization.$requireAuth();
                }]
              }
            }
          }
        });
    }
  ]);
})();