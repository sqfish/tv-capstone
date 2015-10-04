(function() {
  'use strict';

  angular
    .module('TVcast')
    .factory('ShowData', ShowData);

    ShowData.$inject = ['$firebaseArray'];

    function ShowData ($firebaseArray) {
      var ref = new Firebase("https://tv-capstone.firebaseio.com/showlist");
      return $firebaseArray(ref);
    }
})();