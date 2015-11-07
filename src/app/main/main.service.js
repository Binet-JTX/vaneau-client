(function() {
    'use strict';

    angular
        .module('vaneau')
        .factory('Category', Category)
        .factory('Video', Video)
        .factory('Student', Student)
        .factory('Vote', Vote);

    /** @ngInject */
    function Category(DS) {
        return DS.defineResource({
            name: 'category',
            relations: {
                hasMany: {
                    video: {
                        localField: 'videos',
                        foreignKey: 'category_id'
                    },
                    vote: {
                        localField: 'votes',
                        foreignKey: 'category_id'
                    }
                }
            }
        });
    }

    /** @ngInject */
    function Video(DS) {
        return DS.defineResource({
            name: 'video',
            relations: {
                belongsTo: {
                    category: {
                        localField: 'category',
                        localKey: 'category_id'
                    }
                },
                hasMany: {
                    vote: {
                        localField: 'votes',
                        foreignKey: 'video_id'
                    }
                }
            }
        });
    }

    /** @ngInject */
    function Student(DS) {
        return DS.defineResource({
            name: 'student',
            relations: {
                hasMany: {
                    vote: {
                        localField: 'votes',
                        foreignKey: 'student_id'
                    }
                }
            },
            methods: {
                aDejaVote: function(cat) {
                    return _.filter(this.votes, function(v) { return v.category.id == cat; }).length > 0;
                },
                voted: function(cat) {
                    var vl = _.filter(this.votes, function(v) { return v.category.id == cat; });
                    if (vl.length == 0) {
                        return null;
                    } else {
                        return vl[0].video;
                    }
                }
            },
            actions: {
                frankiz_url: {
                    method: 'POST'
                },
                frankiz_auth_check: {
                    method: 'POST'
                }
            }
        });
    }

    /** @ngInject */
    function Vote(DS) {
        return DS.defineResource({
            name: 'vote',
            relations: {
                belongsTo: {
                    student: {
                        localField: 'student',
                        localKey: 'student_id'
                    },
                    video: {
                        localField: 'video',
                        localKey: 'video_id'
                    },
                    category: {
                        localField: 'category',
                        localKey: 'category_id'
                    }
                }
            }
        });
    }
})();
