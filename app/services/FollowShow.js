(function() {
  'use strict';

  angular
  .module('TVcast.search')
  .factory("FollowShow", FollowShow);

  FollowShow.$inject = ['QueryShows', 'ShowData', '$firebaseArray'];

  function FollowShow (QueryShows, ShowData, $firebaseArray) {
    var vm = this;
    vm.ref = ShowData;
    vm.getShowDetails = function(id) {
      QueryShows.lookup(id)
      .then(function(response) {
        console.log("success", response.data);
        vm.postShowDetails(response.data);
        // return response.data;
      }, function(response) {
        console.log("error", response);
        return response;
      });
    };

    vm.postShowDetails = function(details) {
      var showDetails = details;
      var key = showDetails.ids.slug;
      var obj = {};
      obj[key] = showDetails;
      vm.ref.$add(obj); 
    };

    return {
      follow : function(id) {
        var details = vm.getShowDetails(id);
        return;
      }
    };
  }
})();