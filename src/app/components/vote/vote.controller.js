(function() {
    'use strict';

    angular
        .module('vaneau.vote')
        .controller('VoteLayoutController', VoteLayoutController)
        .controller('VoteHomeController', VoteHomeController)
        .controller('VoteCategoryController', VoteCategoryController)
        .controller('VoteResultsController', VoteResultsController);

    /** @ngInject */
    function VoteLayoutController(DS, Student, Category, Video, Vote, categories, $localStorage, $window, $state, $rootScope, $log) {
        var vm = this;

        // Authentification
        var page = '/binet-jtx.com/'.test(window.location.hostname) ? 'http://binet-jtx.com/vaneau/' : 'http://jtx/vaneau/',
        
        Student.frankiz_url({data: {'page': page}, bypassCache: true}).then(function(l) {
            vm.frankiz_url = l.data;
        });

        vm.loggedIn = false;

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
                        $log.debug(vm.student);
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
            $window.location.href = 'http://localhost:3000/';
        };

        vm.categories = categories;

        $rootScope.design = { image: 'rideau.jpg' };

        vm.background = function() {
            if ($state.includes('vote.category')) {
                return "url(assets/images/" + $rootScope.design.image + ")";
            } else {
                return "url(assets/images/rideau.jpg)";
            }
        };
    }

    /** @ngInject */
    function VoteHomeController() {
        var vm = this;
        //
    }

    /** @ngInject */
    function VoteCategoryController(Student, Category, Video, Vote, category, $localStorage, $window, $rootScope, $log) {
        var vm = this;

        var get_params = $localStorage.fkz_suffix;

        vm.category = category;

        $rootScope.design.image = category.background;

        vm.addVote = function(cat_id, video_id, student_id) {
            Vote.create({
                student: student_id,
                category: cat_id,
                video: video_id
            }, {suffix: get_params});
        };

        vm.removeVote = function(cat_id, student_id) {
            var suffix = "?student=" + student_id + "&category=" + cat_id + "&" + get_params.substring(1);
            Vote.findAll({}, {suffix: suffix}).then(function(vl) {
                if (vl.length == 1) {
                    vl[0].DSDestroy({suffix: get_params});
                }
            });
        };
    }

    /** @ngInject */
    function VoteResultsController(Student, Category, Video, Vote, categories, $localStorage, $window, $rootScope, $log) {
        var vm = this;

        vm.categories = categories;
        _.forEach(vm.categories, function(c) {
            _.forEach(c.videos, function(v) {
                v.total = v.votes.length;
            });
        });

        Student.findAll().then(function(s) {
            vm.count_students = s.length;
        })
        
        $log.debug(categories[0].videos);
    }
})();