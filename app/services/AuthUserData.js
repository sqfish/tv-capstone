(function() {
  'use strict';

  angular
    .module('TVcast.authentication')
    .factory('fbAuthorization', fbAuthorization);

    fbAuthorization.$inject = ['$firebaseAuth'];
    
    function fbAuthorization($firebaseAuth) {
      var ref = new Firebase("https://tv-capstone.firebaseio.com/showlist");
      return $firebaseAuth(ref);
    }
})();