(function() {
  'use strict';

  angular
    .module('TVcast')
    .factory('AuthUserData', AuthUserData)
    .factory('fbAuthorization', fbAuthorization);

  AuthUserData.$inject = ['$firebaseAuth', '$firebaseObject'];
  fbAuthorization.$inject = ['$firebaseAuth'];
  
  function fbAuthorization($firebaseAuth) {
    var ref = new Firebase("https://tv-capstone.firebaseio.com/showlist");
    return $firebaseAuth(ref);
  }

  function AuthUserData ($firebaseAuth, $firebaseObject) {
    var vm = this;
    var ref = new Firebase("https://tv-capstone.firebaseio.com/showlist");
    var user = {};
    return {
      map: function (uid) {
        user.uid = uid;
        var mapref = new Firebase('https://tv-capstone.firebaseio.com/user-mapping/' + uid);
        return $firebaseObject(mapref);
      },
      profile: function(mainuid) {
        user.mainuid = mainuid;
        var profileref = new Firebase('https://tv-capstone.firebaseio.com/users/' + mainuid);
        return $firebaseObject(profileref);
      },
      userData: function() {
        if(user) {
          return user;
        }
      }
    };
  }

})();