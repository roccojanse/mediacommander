module.exports = function(grunt) {

    // project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Tasks
        bump: {
          options: {
            files: ['package.json'],
            updateConfigs: ['pkg'],
            commit: false,
            createTag: false,
            push: false
          }
        },

        cleanup: {
            dev: ['<%= pkg.app.path %>/app.tmp.css']
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    trace: false,
                    noCache: true,
                    sourcemap: true
                },
                files: {
                    '<%= pkg.app.csspath %>/<%= pkg.name %>.css': ['<%= pkg.app.path %>/app.scss']
                }
            }
        },

        jshint: {
            files: ['<%= pkg.app.path %>/**/*.js'],
            options: {
                undef: true,
                unused: false,
                loopfunc: true,
                browser: true,
                devel: true,
                jquery: true,
                globals: {
                    'angular': true,
                    'io': true
                }
            }
        },

        uglify: {
            prep: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true,
                    sourceMap: true,
                    preserveComments: 'all'
                },
                files: {
                    '<%= pkg.app.path %>/modules.js': [
                                                        '<%= pkg.app.path %>/**/*.js', 
                                                        '!<%= pkg.app.path %>/app.js',
                                                        '!<%= pkg.app.path %>/modules.js',
                                                        '!<%= pkg.app.path %>/controllers.js',
                                                        '!<%= pkg.app.path %>/directives.js',
                                                        '!<%= pkg.app.path %>/filters.js',
                                                        '!<%= pkg.app.path %>/serices.js',
                                                        '!<%= pkg.app.path %>/**/*-controller.js',
                                                        '!<%= pkg.app.path %>/**/*-directive.js',
                                                        '!<%= pkg.app.path %>/**/*-filter.js',
                                                        '!<%= pkg.app.path %>/**/*-service.js',
                                                    ], 
                    '<%= pkg.app.path %>/controllers.js': ['<%= pkg.app.path %>/**/*-controller.js'], 
                    '<%= pkg.app.path %>/directives.js': ['<%= pkg.app.path %>/**/*-directive.js'], 
                    '<%= pkg.app.path %>/filters.js': ['<%= pkg.app.path %>/**/*-filter.js'], 
                    '<%= pkg.app.path %>/services.js': ['<%= pkg.app.path %>/**/*-service.js'],
                    '<%= pkg.app.jspath %>/<%= pkg.name %>.js': ['<%= pkg.app.path %>/modules.js', '<%= pkg.app.path %>/app.js', '<%= pkg.app.path %>/controllers.js', '<%= pkg.app.path %>/directives.js', '<%= pkg.app.path %>/filters.js', '<%= pkg.app.path %>/services.js']
                }
            }
        },

        // imageEmbed: {
        //     dev: {
        //         src: '<%= pkg.app.dest.csspath %>/<%= pkg.name %>.css',
        //         dest: '<%= pkg.app.dest.csspath %>/<%= pkg.name %>.css',
        //         options: {
        //             baseDir: '/',
        //             maxImageSize: 32768, // default is 32768 (32kb IE8 limit)
        //             deleteAfterEncoding: false
        //         }
        //     },
        //     prod: {
        //         src: '<%= pkg.app.dest.csspath %>/<%= pkg.name %>-<%= pkg.version %>.min.css',
        //         dest: '<%= pkg.app.dest.csspath %>/<%= pkg.name %>-<%= pkg.version %>.min.css',
        //         options: {
        //             baseDir: '/',
        //             maxImageSize: 32768, // default is 32768 (32kb IE8 limit)
        //             deleteAfterEncoding: false
        //         }
        //     }
        // },

        svgmin: {
            options: {
                plugins: [{
                    removeViewBox: false
                },{
                    removeUsselessStrokeAndFill: false
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.app.path %>',
                    src: ['**/*.svg'],
                    dest: '<%= pkg.app.path %>',
                    ext: '.min.svg'
                }]
            }
        },

        watch: {
            config: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true,
                    spawn: false,
                    atBegin: true
                },
                tasks: ['default']
            },
            css: {
                files: ['<%= pkg.app.path %>/**/*.scss'],
                tasks: ['default'],
                options: {
                    spawn: false
                }                
            },
            scripts: {
                files: ['<%= pkg.app.path %>/**/*.js'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            },
            svg: {
                files: ['<%= pkg.app.path %>/**/*.svg'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            }
        },

        notify: {
            default: {
                options: {
                    title: '<%= pkg.name %> v<%= pkg.version %> build',
                    message: 'Completed.'
                }
            }
        }

    });

    // load plugins
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-image-embed');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-clear');
    grunt.loadNpmTasks('grunt-notify');

    // sub tasks
    grunt.registerTask('force-on', 'turning forced on', function() { grunt.option('force', true); });
    grunt.registerTask('force-off', 'turning forced off', function() { grunt.option('force', true); });

    // main tasks
    grunt.registerTask('development', ['clear', 'sass:dev', 'force-on', 'jshint', 'uglify:prep', 'force-off', 'notify']);
    //grunt.registerTask('production', ['compile-sass-prod', 'compile-js-prod', 'optimise-images-prod']);

    // command line tasks
    grunt.registerTask('default', ['bump:build', 'development']);
    grunt.registerTask('patch', ['bump:patch', 'development']);
    grunt.registerTask('minor', ['bump:minor', 'development']);
    grunt.registerTask('major', ['bump:major', 'development']);

};