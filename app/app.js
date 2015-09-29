angular
  .module('TVcast', [
      'ngMaterial',
      'ui.router',
      'firebase',
      'TVcast.authentication',
      'TVcast.routes',
      'TVcast.main',
      'TVcast.search',
      'TVcast.popular'
      // 'TVcast.home'
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
    $scope.logout = function() {
      fbAuthorization.$unauth();
      $scope.currentAuth = null;
      $state.go("login");
    };
  }]);
 