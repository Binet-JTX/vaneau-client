(function() {
  'use strict';

  angular
    .module('vaneau', [
        'ngAnimate', 
        'ngCookies', 
        'ngTouch', 
        'ngSanitize', 
        'ngMessages', 
        'ngAria', 
        'ui.router', 
        'ui.bootstrap', 

        'js-data',
        'ngStorage',
        'vaneau.vote'
    ]);

})();
