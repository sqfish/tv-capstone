(function() {
  'use strict';

  angular
    .module('TVcast')
    .factory('AuthUserData', AuthUserData)
    .factory('fbAuthorization', fbAuthorization);

  AuthUserData.$inject = ['$firebaseAuth', '$firebaseObject', '$firebaseArray'];
  fbAuthorization.$inject = ['$firebaseAuth'];
  
  function fbAuthorization($firebaseAuth) {
    var ref = new Firebase("https://tv-capstone.firebaseio.com/showlist");
    return $firebaseAuth(ref);
  }

  function AuthUserData ($firebaseAuth, $firebaseObject, $firebaseArray) {
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
      following: function(mainuid) {
        user.mainuid = mainuid;
        var followingref = new Firebase('https://tv-capstone.firebaseio.com/users/' + mainuid + '/following');
        return $firebaseArray(followingref);
      },
      watching: function(mainuid) {
        user.mainuid = mainuid;
        var watchingref = new Firebase('https://tv-capstone.firebaseio.com/users/' + mainuid + '/watching');
        return $firebaseArray(watchingref);
      },
      userData: function() {
        if(user) {
          return user;
        }
      }
    };
  }

})();