(function(){
  'use strict';

  angular
    .module('TVcast.authentication')
    .controller('NewAccountCtrl', NewAccountCtrl);

  NewAccountCtrl.$inject = ['fbAuthorization', '$state'];
  
  function NewAccountCtrl(fbAuthorization, $state) {
    var vm = this;
    vm.ref = fbAuthorization;
    vm.createAccount = function() {
      vm.ref.$createUser({
        email     : vm.email,
        password  : vm.password
      }).then(function(userData){
        // vm.ref.child('users').child(userData.uid).set({
        //   name: vm.email.replace(/@.*/, '')
        // });
        return vm.ref.$authWithPassword({
          email     : vm.email,
          password  : vm.password
        });
      }).then(function(authData) {
        $state.go('app.main');
      }).catch(function(error){
        console.log("error", error);
      });
    };
  }
})();