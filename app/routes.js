(function() {
  'use strict';

  angular
    .module('TVcast.routes', [])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', AppRoutes]);
  
  function AppRoutes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when("", "/")
                      .otherwise('/');
    $stateProvider
        .state('app', {
          url         : '',
          abstract    : true,
          views       : {
            '': {template: '<ui-view name="nav"></ui-view name="nav"><div ui-view name="content"></div>'},
            'nav@app': {templateUrl: 'partials/nav.html'},
            'content@app': {template: '<p>This is the app content</p>'}
          }
        });
  }
  

})();