(function() {
  'use strict';

  angular
  .module('TVcast')
  .factory("FollowShow", FollowShow);

  FollowShow.$inject = ['QueryShows', 'ShowData', '$firebaseArray', 'AuthUserData'];

  function FollowShow (QueryShows, ShowData, $firebaseArray, AuthUserData) {
    var vm = this;
    // var ref = ShowData;
    var ref = new Firebase("https://tv-capstone.firebaseio.com/showlist");
    var ref2 = new Firebase("https://tv-capstone.firebaseio.com/users");
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

    vm.postShowDetails = function (details) {
      var showDetails = details;
      var key = showDetails.ids.slug;

      var obj = {};
      obj[key] = showDetails;
      ref.child(key).set(showDetails);
      var status = showDetails.status;
      return vm.addShow(key, status);
    };

    vm.addShow = function (key, status) {
      var userData = AuthUserData.userData();
      var obj = {};
      obj[key] = key;
      // Check to see if user ids have been stored in userData
      // This helps resolve data if user refreshes browser
      // SELF: This needs to DRY-ed, maybe with service for all data loading (main, home, profile)
      if (!userData.uid || !userData.mainuid) {
        var uid = currentAuth.uid;
        AuthUserData.map(uid).$loaded(function(data){
          vm.rootuid = data.$value;
          vm.ref3 = ref2.child(vm.rootuid);
        });
      } else {
        vm.rootuid = userData.mainuid;
        vm.ref3 = ref2.child(vm.rootuid);
      }
      if(status == "returning series") {
        return vm.ref3.child('following').child(key).set(key);
      } else {
        return vm.ref3.child('watching').child(key).set(key);
      }
    };

    return {
      follow : function(id) {
        return vm.getShowDetails(id);
      }
    };
  }
})();