(function() {
  'use strict';

  angular
    .module('TVcast.routes', [])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', AppRoutes]);
  
  function AppRoutes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.when("", "/app")
                      .otherwise('/main');
    $stateProvider
      .state('login', {
          url: '/login', 
          templateUrl: 'partials/login.html',
          controller: 'SecurityCtrl as security'
      })
      .state('register', {
          url: '/register', 
          templateUrl: 'partials/register.html',
          controller: 'NewAccountCtrl as acct'
      })
      .state('app', {
        url         : '',
        abstract    : true,
        views       : {
          '': {template: '<ui-view name="nav"></ui-view name="nav"><div ui-view name="content"></div>'},
          'nav@app': {
            templateUrl: 'partials/nav.html',
            controller: 'AppCtrl'
          },
          'content@app': {template: '<p>This is the app content</p>'}
        },
        resolve: {
          'currentAuth': ['fbAuthorization', function(fbAuthorization) {
            return fbAuthorization.$waitForAuth();
          }]
        }
      });
  }

})();