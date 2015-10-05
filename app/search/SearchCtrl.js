(function() {
  'use strict';

  angular
  .module('TVcast.search')
  .controller("SearchCtrl", SearchCtrl)
  .controller("DialogController", DialogController);

  SearchCtrl.$inject = ['$scope', 'QueryShows', '$mdDialog', '$mdToast', 'FollowShow'];

  function SearchCtrl ($scope, QueryShows, $mdDialog, $mdToast, FollowShow) {
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
      vm.showSimpleToast();
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

    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
    };
    function sanitizePosition() {
      var current = $scope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }
    vm.showSimpleToast = function() {
      $mdToast.show(
        $mdToast.simple()
          .content('Successfully followed selected show!')
          .position($scope.getToastPosition())
          .hideDelay(3000)
      );
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