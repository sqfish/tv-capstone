(function() {
  'use strict';

  angular
  .module('TVcast.popular')
  .controller('PopularCtrl', PopularCtrl);

  PopularCtrl.$inject = ['QueryShows'];

  function PopularCtrl (QueryShows) {
    var vm = this;
    vm.showlistpop = '';
    vm.tiles = '';
    QueryShows.popular()
      .then(function(response) {
        console.log("success", response.data);
        vm.showlistpop = response.data;
        vm.tiles = buildGrid(response.data);
        return response.data;
      }, function(response) {
        console.log("error", response.data);
        return response.data;
      });

    function buildGrid(data) {
      var tiles = [];
      for (var i = 0; i < data.length; i++) {
        tiles.push({
          image: data[i].images.poster.medium,
          title: data[i].title,
          votes: data[i].votes,
          rating: data[i].rating,
          country: data[i].country,
          network: data[i].network,
          genre: data[i].genres,
          colspan: randomSpan(),
          rowspan: randomSpan()
        });
      }
      return tiles;
    }
    
    function randomSpan() {
      var r = Math.random();
      if (r < 0.8) {
        return 1;
      } else if (r < 0.9) {
        return 2;
      } else {
        return 3;
      }
    }

    function buildGridModel(tileTmpl){
      var it;
      var results = [ ];
      for (var j=0; j<11; j++) {
        it = angular.extend({},tileTmpl);
        it.span  = { row : 1, col : 1 };
        switch(j+1) {
          case 1:
            it.background = "red";
            it.span.row = it.span.col = 2;
            break;
          case 2: it.background = "green";         break;
          case 3: it.background = "darkBlue";      break;
          case 4:
            it.background = "blue";
            it.span.col = 2;
            break;
          case 5:
            it.background = "yellow";
            it.span.row = it.span.col = 2;
            break;
          case 6: it.background = "pink";          break;
          case 7: it.background = "darkBlue";      break;
          case 8: it.background = "purple";        break;
          case 9: it.background = "deepBlue";      break;
          case 10: it.background = "lightPurple";  break;
          case 11: it.background = "yellow";       break;
        }
        results.push(it);
      }
      return results;
    }
  }

  


})();