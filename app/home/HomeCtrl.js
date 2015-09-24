(function() {
  'use strict';

  angular
  .module('TVcast.home')
  .controller("HomeCtrl", HomeCtrl);

  HomeCtrl.$inject = ['QueryShows'];

  function HomeCtrl (QueryShows) {
    var vm = this;
    vm.queryText = "";
    vm.search = function() {
      QueryShows.search(vm.queryText);
    };
  }
})();