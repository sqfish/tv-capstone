angular
  .module('TVcast', [
      'ngMaterial',
      'ui.router',
      'firebase',
      'TVcast.authentication',
      'TVcast.routes',
      'TVcast.main',
      'TVcast.search',
      'TVcast.popular',
      'TVcast.account'
  ])
  .config(['$mdThemingProvider',
    function ($mdThemingProvider){
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
          'default' : '500',
          'hue-1'   : '50',
          'hue-2'   : '800',
          'hue-3'   : 'A700'
        })
        .accentPalette('amber')
        .warnPalette('red', {
          'default' : '600',
          'hue-1'   : '500',
          'hue-2'   : '900',
          'hue-3'   : 'A700'
        });
    }
  ])
  .run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.For example,
      // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
      // to active whenever 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        if (error === "AUTH_REQUIRED") {
          $state.go("login");
        }
      });
    }
  ])
  .controller('AppCtrl', ['currentAuth', '$scope', 'fbAuthorization', '$state', function(currentAuth, $scope, fbAuthorization, $state){
    $scope.currentAuth = currentAuth;
    var tabStateMapping = {
      'app.main': 0,
      'app.account': 1,
      'app.search': 2,
      'app.popular': 3,
      'app.login': 4
    };
    $scope.currentState = tabStateMapping[$state.current.name];
    
    $scope.logout = function() {
      fbAuthorization.$unauth();
      $scope.currentAuth = null;
      $state.go("login");
    };
  }]);
 