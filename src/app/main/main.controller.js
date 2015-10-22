(function() {
    'use strict';

    angular
        .module('vaneau')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(DS, Category, Video, Student, Vote, $location, $localStorage, $window, $log) {
        var vm = this;

        vm.scrollToCategory = function(i) {
            if (i == -1) {
                $location.hash('homeslide');
            } else {
                var j = (i % vm.categories.length);
                $location.hash('category-' + j);
            }
        };

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
            $window.location.href = 'http://localhost/vaneaux-dor/';
        };

        // Catégories et vidéos
        Category.findAll().then(function(categories) {
            vm.categories = categories;
            $log.debug(vm.categories);
        });

        vm.background = function(cat) {
            return "url(assets/images/" + cat.background + ")";
        };

        vm.addVote = function(cat_id, video_id) {
            Vote.create({
                student: vm.student.id,
                category: cat_id,
                video: video_id
            }, {suffix: get_params});
        };

        vm.removeVote = function(cat_id) {
            var suffix = "?student=" + vm.student.id + "&category=" + cat_id + "&" + get_params.substring(1);
            Vote.findAll({}, {suffix: suffix}).then(function(vl) {
                if (vl.length == 1) {
                    vl[0].DSDestroy({suffix: get_params});
                }
            });
        };
    }
})();
