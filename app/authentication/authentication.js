(function(){
  'use strict';

  angular.module('authentication',[
    'firebase'
  ])
  .factory('Auth', Auth);

  function Auth() {
    return {
      getCurrentUser : getCurrentUser,
      login : login,
      logout : logout
    };
  }
    function fbAuth(){
      var ref = new Firebase("https://tv-capstone.firebaseio.com/showlist");
      return $firebaseAuth(ref);
    }
    var service = {
    isAuthenticated: function(){
      return authData.$getAuth();
    },

    getCurrentUser: function () {
      if ( service.isAuthenticated() ) {
        console.log("logged in");
        return service.currentUser;
      } else {
        console.log("not logged in");
        return service.currentUser;
      }
    },

    currentUser: null,
    authData: null
  };

  return service;



  }

})();