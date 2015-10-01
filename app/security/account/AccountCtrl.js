(function(){
  'use strict';

  angular
    .module('TVcast.account')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['fbAuthorization'];

  function AccountCtrl (fbAuthorization) {
    var vm = this;
    vm.auth = fbAuthorization.$getAuth();
    console.log(vm.auth);
  }

  
})();