(function() {
  'use strict';

  angular
  .module('TVcast')
  .filter('myFilter', myFilter);

  //This filter is designed to limit full showlist to only
  //shows that are listed as "followed" in the user's profile.
  function myFilter () {
    return function(input, predicate) {
      input = input || '';
      predicate = predicate || '';
      var output = [];
      //Iterate through full showlist
      for (var i = 0; i < input.length; i++) {
        //Iterate through user's followed shows
        for (var j = 0; j < predicate.ids.slug.length; j++) {
          if (input[i].ids.slug == predicate.ids.slug[j].$value) {
            output.push(input[i]);
          }
        }
      }
      return output;
    };
  }
})();