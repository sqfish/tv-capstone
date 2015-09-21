// require.config({
//   baseUrl: './app',
//   paths: {
//     'angular': '../lib/bower_components/angular/angular',
//     'angular-ui-router': '../lib/bower_components/angular-ui-router/release/angular-ui-router',
//     'angular-aria': '../lib/bower_components/angular-aria/angular-aria',
//     'angular-animate': '../lib/bower_components/angular-animate/angular-animate',
//     'angular-material': '../lib/bower_components/angular-material/angular-material',
//     'jquery': '../lib/bower_components/jquery/dist/jquery.min',
//     'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
//     'firebase': '../lib/bower_components/firebase/firebase',
//     'angularfire': '../lib/bower_components/angularfire/dist/angularfire'
//   },
//   shim: {
//     'angular': {
//       exports : 'angular'
//     },
//     'angular-ui-router': ['angular'],
//     'angular-aria': ['angular'],
//     'angular-animate': ['angular'],
//     'angular-material': ['angular'],
//     'bootstrap': ['jquery'],
//     'angularfire': ['angular', 'firebase'],
//     'firebase': {
//       exports: 'Firebase'
//     },
//   },
//   priority: [
//     'angular'
//   ]
// });
// //http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
// window.name = 'NG_DEFER_BOOTSTRAP!';

// require(
//   ['dependencies', 'angular', 'app'], 
//   function(deps, angular, app) {
//     // authentication.then(function(){
//     //   require(["app"], function() {
//     //     angular.resumeBootstrap(document.body, ['TVcast'])
//     //   });
//     // })
//     // .fail(function(error){
//     //   console.log("error", error);
//     // });
//     var $html = angular.element(document.getElementsByTagName('body')[0]);
//     angular.element($html).ready(function() {
//       // angular.bootstrap(document.body, ['TVcast']);
//       angular.resumeBootstrap(document.body, ['TVcast']);
//     });
// });