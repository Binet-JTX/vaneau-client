(function() {
    'use strict';

    angular
        .module('vaneau')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(DS, Student, Vote, $location, $localStorage, $window, $state, $log) {
        var vm = this;

        // Authentification
        vm.loggedIn = false;
        vm.isLoggedIn = function() {
            return vm.loggedIn;
        };

        var page = /binet-jtx.com/.test(window.location.hostname) ? 'http://binet-jtx.com/vaneau/' : 'http://jtx/vaneau/';

        var get_params = window.location.search;
        if (get_params != "") {
            $localStorage.fkz_suffix = get_params;
        }

        if (angular.isDefined($localStorage.fkz_suffix)) {
            Student.frankiz_auth_check({data: {'page': page}, suffix: $localStorage.fkz_suffix, bypassCache: true}).then(function(response) {
                if (response.data.valid) {
                    DS.ejectAll('student');
                    Student.inject(response.data.student);
                    Student.find(response.data.student.id).then(function(s) {
                        vm.student = s;
                        $log.debug(s.votes);
                    });
                    vm.loggedIn = true;
                    $state.go('vote.home');
                }
            });
        } else {
            DS.ejectAll('student');
        }

        Student.frankiz_url({data: {'page': page}, bypassCache: true}).then(function(l) {
            vm.frankiz_url = l.data;
        });

        vm.logout = function() {
            delete $localStorage.fkz_suffix;
            DS.ejectAll('student');
            vm.loggedIn = false;
            $window.location.href = 'http://binet-jtx.com/';
        };

        vm.voteOpen = function() {
            return moment().isBefore('2015-11-12 16:00:00');
        };
    }
})();
