(function() {
    'use strict';

    angular
        .module('vaneau')
        .config(config);

    /** @ngInject */
    function config($logProvider, DSProvider, DSHttpAdapterProvider) {
        // Enable log
        var DEBUG = true;
        $logProvider.debugEnabled(true);

        angular.extend(DSProvider.defaults, {
            debug: true
        });
        if (!DEBUG) {
            angular.extend(DSHttpAdapterProvider.defaults, {
                basePath: /binet-jtx.com/.test(window.location.hostname) ? 'http://binet-jtx.com/vaneau/api' : 'http://jtx/vaneau/api',
                forceTrailingSlash: true
            });
        } else {
            angular.extend(DSHttpAdapterProvider.defaults, {
                basePath: 'http://127.0.0.1:8000',
                forceTrailingSlash: true
            });
        }
    }

})();
