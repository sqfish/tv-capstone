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
        var qurl = 'https://api-v2launch.trakt.tv/search?query=' + query + '&type=show&?page=1&limit=36';
        var appID = 'd2a7a0ca1dbe8300bcfa5f0e1d38e10e03403ee7769e390f636411d18bbcc00e';
        var request = {
          method: 'GET',
          url: qurl,
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