(function() {
  'use strict';

  angular
  .module('TVcast')
  .factory("FollowShow", FollowShow);

  FollowShow.$inject = ['QueryShows', 'ShowData', '$firebaseArray'];

  function FollowShow (QueryShows, ShowData, $firebaseArray) {
    var vm = this;
    // var ref = ShowData;
    var ref = new Firebase("https://tv-capstone.firebaseio.com/showlist");
    vm.getShowDetails = function(id) {
      QueryShows.lookup(id)
      .then(function(response) {
        console.log("success", response.data);
        return vm.postShowDetails(response.data);
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
      return ref.child(key).set(showDetails);
    };

    return {
      follow : function(id) {
        return vm.getShowDetails(id);
      }
    };
  }
})();