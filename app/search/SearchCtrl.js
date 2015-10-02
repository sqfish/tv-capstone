(function() {
  'use strict';

  angular
  .module('TVcast.search')
  .controller("SearchCtrl", SearchCtrl)
  .controller("DialogController", DialogController);

  SearchCtrl.$inject = ['$scope', 'QueryShows', '$mdDialog', 'FollowShow'];

  function SearchCtrl ($scope, QueryShows, $mdDialog, FollowShow) {
    var vm = this;
    vm.queryText = "";
    vm.queryResults = "";
    vm.status = null;
    vm.selectedResult = "";
    vm.search = function() {
      vm.status = null;
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
    vm.followShow = function(show) {
      show = show.show;
      vm.status = 'You followed "' + show.title + '".';
      FollowShow.follow(show.ids.trakt);
    };

    vm.showAdvanced = function(ev, result) {
      vm.selectedResult = result;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'partials/dialog-show-detail.html',
        scope: $scope,
        preserveScope: true,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {result: vm.selectedResult}
      })
      .then(function(show) {
        vm.followShow(show);
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

    $scope.follow = function(show) { 
      //Post to firebase here
      $mdDialog.hide(show);
    };
  }

})();