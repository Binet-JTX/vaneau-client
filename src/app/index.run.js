(function() {
    'use strict';

    angular
        .module('vaneau')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();
