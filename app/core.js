define(function(require) {
  var auth = require("authentication");
  var app = require("app");

  var $html = angular.element(document.getElementsByTagName('body')[0]);
  angular.element($html).ready(function() {
    // angular.bootstrap(document.body, ['TVcast']);
    angular.resumeBootstrap(document.body, ['TVcast'])
  });
  }
);