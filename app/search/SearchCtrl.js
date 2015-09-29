(function() {
  'use strict';

  angular
  .module('TVcast.search')
  .controller("SearchCtrl", SearchCtrl)
  .controller("DialogController", DialogController);

  SearchCtrl.$inject = ['$scope', 'QueryShows', '$mdDialog'];
  DialogController.$inject = ['$scope', '$mdDialog'];

  function SearchCtrl ($scope, QueryShows, $mdDialog) {
    var vm = this;
    vm.queryText = "";
    vm.queryResults = "";
    vm.status = "Status Here";
    vm.selectedResult = "";
    vm.search = function() {
      QueryShows.search(vm.queryText)
      .then(function(response) {
        console.log("success", response.data);
        vm.queryResults = response.data;
        return response.data;
      }, function(response) {
        console.log("error", response.data);
        return response.data;
      });
    };

    vm.showAdvanced = function(ev, $index) {
      vm.selectedResult = vm.queryResults[$index];
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'partials/dialog.html',
        scope: $scope,
        preserveScope: true,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {result: vm.selectedResult}
      })
      .then(function(answer) {
        vm.status = 'You followed "' + answer + '".';
      }, function() {
        vm.status = 'You cancelled the dialog.';
      });
    };
  }

  function DialogController($scope, $mdDialog, result) {
    console.log("selected result", $scope.search.selectedResult);
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

})();