(function() {
  'use strict';

  angular
  .module('TVcast.main')
  .controller("MainCtrl", MainCtrl);

  MainCtrl.$inject = ['ShowData'];

  function MainCtrl (ShowData) {
    var vm = this;
    vm.showlist = ShowData;
  }
})();