(function() {
  'use strict';

  angular
  .module('TVcast.home')
  .controller("HomeCtrl", HomeCtrl)
  .controller("DialogDetailCtrl", DialogDetailCtrl);

  HomeCtrl.$inject = ['ShowData', 'AuthUserData', 'myFilterFilter', '$mdDialog', '$scope', 'currentAuth', '$firebaseArray', '$state'];

  function HomeCtrl (ShowData, AuthUserData, myFilterFilter, $mdDialog, $scope, currentAuth, $firebaseArray, $state) {
    var vm = this;
    var userData = {};
    vm.showlist = null;
    vm.limitFollowing = null;
    vm.limitWatching = null;
    
    // Check to see if user ids have been stored in userData
    // This helps resolve data if user refreshes browser
    // SELF: This needs to DRY-ed, maybe with service for all data loading (main, home, profile)
    if (currentAuth === null) {
      $state.go('login');
    } else {
    if (!userData.uid || !userData.mainuid) {
      var uid = currentAuth.uid;
      AuthUserData.map(uid).$loaded(function(data){
        vm.rootuid = data.$value;
        AuthUserData.profile(vm.rootuid).$loaded(function(data){
          vm.following = $firebaseArray(data.$ref().child('following'));
          vm.watching = $firebaseArray(data.$ref().child('watching'));
          ShowData.$loaded(function(data){
            vm.showlist = ShowData;
            vm.limitFollowing = myFilterFilter(vm.showlist, {ids: {slug: vm.following}});
            vm.limitWatching = myFilterFilter(vm.showlist, {ids: {slug: vm.watching}});
          });
        });
      });
    } else {
      AuthUserData.following(userData.mainuid).$loaded(function(data){
        vm.following = $firebaseArray(data.$ref().child('following'));
        vm.watching = $firebaseArray(data.$ref().child('watching'));
        ShowData.$loaded(function(data){
          vm.showlist = ShowData;
          vm.limitFollowing = myFilterFilter(vm.showlist, {ids: {slug: vm.following}});
          vm.limitWatching = myFilterFilter(vm.showlist, {ids: {slug: vm.watching}});
        });
      });
    }
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