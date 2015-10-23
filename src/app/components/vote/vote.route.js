(function() {
    'use strict';

    angular
        .module('vaneau.vote')
        .config(voteRouter);

    /** @ngInject */
    function voteRouter($stateProvider) {
        $stateProvider
            .state('vote', {
                url: '/vote',
                templateUrl: 'app/components/vote/layout.html',
                controller: 'VoteLayoutController',
                controllerAs: 'voteLo',
                abstract: true
            })
                .state('vote.home', {
                    url: '/home',
                    templateUrl: 'app/components/vote/home.html',
                    controller: 'VoteHomeController',
                    controllerAs: 'voteHm'
                })
                .state('vote.category', {
                    url: '/:id',
                    templateUrl: 'app/components/vote/category.html',
                    controller: 'VoteCategoryController',
                    controllerAs: 'vote',
                    resolve: {
                        category: function(Student, Category, Video, Vote, $stateParams) {
                            return Category.find($stateParams.id);
                        }
                    }
                })
        ;
    }
})();