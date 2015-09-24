(function() {
  'use strict';

  angular
  .module('TVcast.home')
  .factory("QueryShows", QueryShows);

  QueryShows.$inject = ['$http'];

  function QueryShows($http) {
    var vm = this;
    return {
      search: function(query) {
        var qurl = 'https://api-v2launch.trakt.tv/search?query=' + query + '&type=show&?extended=full';
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

        $http(request)
          .then(function(response) {
            console.log("success", response.data);
            return response;
          }, function(response) {
            console.log("error", response.data);
            return response;
          });
      }
    };
  }

})();