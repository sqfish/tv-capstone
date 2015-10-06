(function() {
  'use strict';

  angular
  .module('TVcast')
  .factory("TrackEpisodes", TrackEpisodes);

  TrackEpisodes.$inject = ['QueryShows', 'ShowData', 'AuthUserData', 'currentAuth', '$firebaseArray'];

  function TrackEpisodes (QueryShows, ShowData, AuthUserData, currentAuth, $firebaseArray) {
    var vm = this;
  }

})();