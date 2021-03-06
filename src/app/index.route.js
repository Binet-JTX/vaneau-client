(function() {
    'use strict';

    angular
        .module('vaneau')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: "app/main/main.html",
                controller: 'MainController',
                controllerAs: 'main'
            })
        ;

        $urlRouterProvider.otherwise('/');
    }

})();
