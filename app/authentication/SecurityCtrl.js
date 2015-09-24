(function(){
  'use strict';

  angular
    .module('TVcast.authentication')
    .controller('SecurityCtrl', SecurityCtrl);

  SecurityCtrl.$inject = ['$firebaseAuth', '$state', 'fbAuthorization'];
  
  function SecurityCtrl ($firebaseAuth, $state, fbAuthorization) {
    var vm = this;
    vm.auth = fbAuthorization;
    vm.email = "";
    vm.password = "";
    vm.auth.$onAuth(function(authData){
      vm.authData = authData;
    });

    vm.createAccount = function() {
      $state.go("account");
    };

    vm.login = function() {
      var ref = new Firebase("https://tv-capstone.firebaseio.com/");
      ref.authWithPassword({
        email     : vm.email,
        password  : vm.password
      }, function(error, authData){
        if(error) {
          vm.error = error;
        } else {
          vm.authData = authData;
          $state.go("app.main");
        }
      });
    };

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
      }).catch(function(error){
        vm.error = error;
      });
    };
  }
  
})();