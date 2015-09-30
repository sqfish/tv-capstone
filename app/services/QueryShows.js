(function() {
  'use strict';

  angular
  .module('TVcast.search')
  .factory("QueryShows", QueryShows);

  QueryShows.$inject = ['$http'];

  function QueryShows($http) {
    var vm = this;
    return {
      search: function(query) {
        var rurl = 'https://api-v2launch.trakt.tv/search?query=' + query + '&type=show&?page=1&limit=36';
        var appID = 'd2a7a0ca1dbe8300bcfa5f0e1d38e10e03403ee7769e390f636411d18bbcc00e';
        var request = {
          method: 'GET',
          url: rurl,
          headers: {
            'Content-Type' : 'application/json',
            'trakt-api-version' : '2',
            'trakt-api-key' : appID
          }
        };
        return $http(request); 
      },
      popular: function() {
        var rurl = 'https://api-v2launch.trakt.tv/shows/popular?extended=full,images&?page=1&limit=40';
        var appID = 'd2a7a0ca1dbe8300bcfa5f0e1d38e10e03403ee7769e390f636411d18bbcc00e';
        var request = {
          method: 'GET',
          url: rurl,
          headers: {
            'Content-Type' : 'application/json',
            'trakt-api-version' : '2',
            'trakt-api-key' : appID
          }
        };
        return $http(request);
      }
    };
  }
})();