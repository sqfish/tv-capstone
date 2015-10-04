(function(){
  'use strict';

  angular
    .module('TVcast.account')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['fbAuthorization', 'AuthUserData'];

  function AccountCtrl (fbAuthorization, AuthUserData) {
    var vm = this;
    var userData = AuthUserData.userData();
    // Check to see if user ids have been stored in userData
    // This helps resolve data if user refreshes browser
    if (!userData.uid) {
      var auth = fbAuthorization.$getAuth();
      var uid = auth.uid;
      AuthUserData.map(uid).$loaded(function(data){
      vm.rootuid = data.$value;
        AuthUserData.profile(vm.rootuid).$loaded(function(data){
          vm.userData = data;
        });
      });
    } else {
      AuthUserData.profile(userData.mainuid).$loaded(function(data){
        vm.userData = data;
      });
    }
  }
})();