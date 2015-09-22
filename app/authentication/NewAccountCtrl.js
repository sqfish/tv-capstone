(function(){
  'use strict';

  angular
    .module('TVcast.authentication')
    .controller('NewAccountCtrl', NewAccountCtrl);

  NewAccountCtrl.$inject = ['Firebase', '$state'];
  
  function NewAccountCtrl(Firebase, $state) {
    var vm = this;
    var ref = new Firebase("https://tv-capstone.firebaseio.com/");
    // vm.email = "";
    // vm.password = "";
    vm.createAccount = function() {
      console.log(vm.email);
      console.log(vm.password);
      ref.createUser({
        email     : vm.email,
        password  : vm.password
      }, function(error, userData){
        if(error) {
          console.log(error);
        } else {
          $state.go("login")
        }
      });
    }
  }
  
})();