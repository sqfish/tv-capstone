(function() {
  'use strict';

  angular
  .module('TVcast.main')
  .controller("MainCtrl", MainCtrl)
  .controller("DialogDetailCtrl", DialogDetailCtrl);

  MainCtrl.$inject = ['ShowData', '$mdDialog', '$scope'];

  function MainCtrl (ShowData, $mdDialog, $scope) {
    var vm = this;
    vm.showlist = ShowData;

    vm.showAdvanced = function(ev, result) {
      vm.currentShow = result;
      $mdDialog.show({
        controller: DialogDetailCtrl,
        templateUrl: 'partials/dialog-show-detail-full.html',
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
    console.log("currentShow", $scope.main.currentShow);
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
})();