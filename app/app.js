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
      'TVcast.account',
      'TVcast.home',
      'TVcast.dashboard',
      'TVcast.episodes'
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
  .controller('AppCtrl', ['$scope', '$state', 'currentAuth', 'fbAuthorization', 'AuthUserData',  function($scope, $state, currentAuth, fbAuthorization, AuthUserData){
    $scope.currentAuth = currentAuth;
    console.log("currentAuth", currentAuth);
    var userData = AuthUserData.userData();
    // Check to see if user ids have been stored in userData
    // This helps resolve data if user refreshes browser
    if (currentAuth !== null) {
    if (!userData.uid || !userData.mainuid) {
      var uid = currentAuth.uid;
      AuthUserData.map(uid).$loaded(function(data){
        var rootuid = data.$value;
        AuthUserData.profile(rootuid).$loaded(function(data){
          $scope.userData = data;
        });
      });
    } else {
      AuthUserData.profile(userData.mainuid).$loaded(function(data){
        $scope.userData = data;
      });
    }
    }
    var tabStateMapping = {
      'app.main': 0,
      'app.popular': 1,
      'login': 2
    };
    var tabStateMappingFull = {
      'app.main': 0,
      'app.popular': 1,
      'app.home': 2,
      'app.search': 3,
      'app.dashboard': 4,
      'app.account': 5,
      'app.episodes': 6
    };
    $scope.currentState = tabStateMapping[$state.current.name];
    $scope.currentStateFull = tabStateMappingFull[$state.current.name];
    
    $scope.logout = function() {
      fbAuthorization.$unauth();
      $scope.currentAuth = null;
      $state.go("login");
    };
  }]);
 