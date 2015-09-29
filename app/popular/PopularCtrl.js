(function() {
  'use strict';

  angular
  .module('TVcast.popular')
  .controller('PopularCtrl', PopularCtrl);

  PopularCtrl.$inject = ['QueryShows'];

  function PopularCtrl (QueryShows) {
    var vm = this;
    vm.showlistpop = '';
    QueryShows.popular()
      .then(function(response) {
        console.log("success", response.data);
        vm.showlistpop = response.data;
        return response.data;
      }, function(response) {
        console.log("error", response.data);
        return response.data;
      });
  }



})();