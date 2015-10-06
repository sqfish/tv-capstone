(function() {
  'use strict';

  angular
    .module('TVcast.episodes')
    .controller('EpisodeCtrl', EpisodeCtrl);

  EpisodeCtrl.$inject = ['currentAuth', 'QueryShows', 'ShowData', 'AuthUserData', '$state', '$firebaseArray'];

  function EpisodeCtrl (currentAuth, QueryShows, ShowData, AuthUserData, $state, $firebaseArray) {
    var vm = this;
    var getUIDs = new Promise(function(resolve) {
      var userData = {};
      userData.uid = currentAuth.uid;
      AuthUserData.map(userData.uid).$loaded(function(data){
        userData.mainuid = data.$value;
        resolve(userData);
      });
    });

    var getUserShows = function(userData) {
      return new Promise(function(resolve) {
        var userShows = {};
        AuthUserData.profile(userData.mainuid).$loaded(function(data){
          userShows.following = $firebaseArray(data.$ref().child('following'));
          userShows.watching = $firebaseArray(data.$ref().child('watching'));
          resolve(userShows);
        });
      });
    };


  
    if (currentAuth === null) {
      $state.go('login');
    } else {
      getUIDs.then(function(userData){
        return getUserShows(userData);
      }).then(function(userShows){
        vm.userShows = userShows;
        vm.showlist = ShowData;
        var slug = userShows.watching[0].$id;
        return QueryShows.episodes(slug);
      }).then(function(response){
        console.log("data", response.data);
      });
    }
  }
})();