(function(){
  'use strict';

  angular
    .module('TVcast.account')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['fbAuthorization', 'AuthUserData', 'MapUserProfile'];

  function AccountCtrl (fbAuthorization, AuthUserData, MapUserProfile) {
    var vm = this;
    vm.auth = fbAuthorization.$getAuth();
    console.log("auth", vm.auth);
    var uid = vm.auth.uid;
    console.log("uid", uid);
    AuthUserData.map(uid).$loaded(function(data){
      vm.rootuid = data.$value;
      console.log(data);
      AuthUserData.profile(vm.rootuid).$loaded(function(data){
        vm.userData = data;
        console.log(data);
      });
    });
  }

})();