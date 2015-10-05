(function() {
  'use strict';

  angular
  .module('TVcast.home')
  .controller("HomeCtrl", HomeCtrl)
  .controller("DialogDetailCtrl", DialogDetailCtrl);

  HomeCtrl.$inject = ['ShowData', 'AuthUserData', 'myFilterFilter', '$mdDialog', '$scope', 'currentAuth'];

  function HomeCtrl (ShowData, AuthUserData, myFilterFilter, $mdDialog, $scope, currentAuth) {
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
        AuthUserData.following(vm.rootuid).$loaded(function(data){
          vm.following = data;
          ShowData.$loaded(function(data){
            vm.showlist = ShowData;
            vm.limit = myFilterFilter(vm.showlist, {ids: {slug: vm.following}});
          });
        });
      });
    } else {
      AuthUserData.following(userData.mainuid).$loaded(function(data){
        vm.following = data;
        ShowData.$loaded(function(data){
          vm.showlist = ShowData;
          vm.limit = myFilterFilter(vm.showlist, {ids: {slug: vm.following}});
        });
      });
    }

    vm.showAdvanced = function(ev, result) {
      vm.currentShow = result;
      $mdDialog.show({
        controller: DialogDetailCtrl,
        templateUrl: 'partials/dialog-show-followed.html',
        scope: $scope,
        preserveScope: true,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {result: vm.currentShow}
      }).then(function(show) {
      }, function() {
      });
    };
  }

  function DialogDetailCtrl($scope, $mdDialog, result) {
    console.log("currentShow", $scope.home.currentShow);
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
})();