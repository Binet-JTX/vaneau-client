(function() {
    'use strict';

    angular
        .module('vaneau')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(DS, Student, $location, $localStorage, $window, $log) {
        var vm = this;

        // Authentification
        Student.frankiz_url({bypassCache: true}).then(function(l) {
            vm.frankiz_url = l.data;
        });

        vm.loggedIn = false;
        vm.isLoggedIn = function() {
            return vm.loggedIn;
        };

        var get_params = window.location.search;
        if (get_params != "") {
            $localStorage.fkz_suffix = get_params;
        }

        if (angular.isDefined($localStorage.fkz_suffix)) {
            Student.frankiz_auth_check({suffix: $localStorage.fkz_suffix, bypassCache: true}).then(function(response) {
                if (response.data.valid) {
                    DS.ejectAll('student');
                    Student.inject(response.data.student);
                    Student.find(response.data.student.id).then(function(s) {
                        vm.student = s;
                        $log.debug(s.votes);
                    });
                    vm.loggedIn = true;
                }
            });
        } else {
            DS.ejectAll('student');
        }

        vm.logout = function() {
            delete $localStorage.fkz_suffix;
            DS.ejectAll('student');
            vm.loggedIn = false;
            $window.location.href = 'http://jtx/vaneau';
        };
    }
})();
