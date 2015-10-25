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
                abstract: true,
                resolve: {
                    categories: function(Student, Category, Video, Vote) {
                        return Category.findAll();
                    }
                }
            })
                .state('vote.home', {
                    url: '/',
                    templateUrl: 'app/components/vote/home.html',
                    controller: 'VoteHomeController',
                    controllerAs: 'voteHm'
                })
                .state('vote.results', {
                    url: '/results',
                    templateUrl: 'app/components/vote/results.html',
                    controller: 'VoteResultsController',
                    controllerAs: 'voteRes'
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