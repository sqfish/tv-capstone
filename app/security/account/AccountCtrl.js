(function(){
  'use strict';

  angular
    .module('TVcast.account')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['AuthUserData', 'currentAuth'];

  function AccountCtrl (AuthUserData, currentAuth) {
    var vm = this;
    var userData = AuthUserData.userData();
    // Check to see if user ids have been stored in userData
    // This helps resolve data if user refreshes browser
    if (!userData.uid || !userData.mainuid) {
      var uid = currentAuth.uid;
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