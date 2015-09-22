(function(){
  'use strict';

  angular
    .module('TVcast.authentication')
    .controller('SecurityCtrl', SecurityCtrl);

  SecurityCtrl.$inject = ['$firebaseAuth', '$state', 'fbAuthorization'];
  
  function SecurityCtrl ($firebaseAuth, $state, fbAuthorization) {
    var vm = this;
    vm.auth = fbAuthorization;
    vm.auth.$onAuth(function(authData){
      vm.authData = authData;
    });

    vm.loginViaProvider = function () {
      vm.authData = null;
      vm.error = null;
      vm.auth.$authWithOAuthPopup('google',
      function(error, authData){
        if(error){
          console.log(error);
        } else {
          console.log(authData);
        }
      }, {remember: "sessionOnly"})
      .then(function(authData){
        vm.authData = authData;
        $state.go("app.main");
        console.log(vm.authData);
      }).catch(function(error){
        vm.error = error;
      });
    }
  }
  //   vm.getCurrentUser = function () {
  //     if ( AuthData.getAuthData() ) {
  //       console.log("logged in");
  //       return AuthData.currentUser;
  //     } else {
  //       console.log("not logged in");
  //       console.log(AuthData.isAuthenticated);
  //       console.log(AuthData.fbAuthorization);
  //       console.log(AuthData.getAuthData());
  //       return AuthData.currentUser;
  //     }
  //   };
    

})();