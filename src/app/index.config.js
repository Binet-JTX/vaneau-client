(function() {
    'use strict';

    angular
        .module('vaneau')
        .config(config);

    /** @ngInject */
    function config($logProvider, DSProvider, DSHttpAdapterProvider) {
        // Enable log
        var DEBUG = false;
        $logProvider.debugEnabled(DEBUG);

        angular.extend(DSProvider.defaults, {
            debug: DEBUG
        });
        if (!DEBUG) {
            angular.extend(DSHttpAdapterProvider.defaults, {
                basePath: 'http://jtx/vaneau/api',
                forceTrailingSlash: true,
                log: false
            });
        } else {
            angular.extend(DSHttpAdapterProvider.defaults, {
                basePath: 'http://127.0.0.1:8000',
                forceTrailingSlash: true
            });
        }
    }

})();
