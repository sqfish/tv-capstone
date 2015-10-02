(function() {
  'use strict';

  angular
  .module('TVcast.search')
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
      ref.child(key).set(showDetails);
      // return ref.$add(obj); 
    };

    return {
      follow : function(id) {
        return vm.getShowDetails(id);
      }
    };
  }
})();