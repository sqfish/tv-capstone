(function(){
  'use strict';

  angular
    .module('TVcast.dashboard')
    .controller('CalendarCtrl', CalendarCtrl);

    CalendarCtrl.$inject = ['ShowData', 'AuthUserData', 'myFilterFilter', '$mdDialog', '$scope', 'currentAuth'];

  function CalendarCtrl (ShowData, AuthUserData, myFilterFilter, $mdDialog, $scope, currentAuth) {
    var vm = this;
    var userData = AuthUserData.userData();
    vm.showlist = null;
    // vm.following = '';
    // vm.following = null;
    
    // Check to see if user ids have been stored in userData
    // This helps resolve data if user refreshes browser
    // SELF: This needs to DRY-ed, maybe with service for all data loading (main, home, profile)
    if (!userData.uid || !userData.mainuid) {
      var uid = currentAuth.uid;
      AuthUserData.map(uid).$loaded(function(data){
        vm.rootuid = data.$value;
        AuthUserData.profile(vm.rootuid).$loaded(function(data){
          vm.userData = data;
          vm.following = data.following;
          ShowData.$loaded(function(data){
            vm.showlist = ShowData;
            vm.limit = myFilterFilter(vm.showlist, {ids: {slug: vm.following}});
          });
        });
      });
    } else {
      AuthUserData.profile(userData.mainuid).$loaded(function(data){
        vm.userData = data;
        vm.following = data.following;
        ShowData.$loaded(function(data){
          vm.showlist = ShowData;
          vm.limit = myFilterFilter(vm.showlist, {ids: {slug: vm.following}});
        });
      });
    }
  }

})();