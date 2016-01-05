// Generated on 2014-12-03 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

var path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    ext = function(file) {
        return path.extname(file).slice(1);
    };

module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-contrib-concat');

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    var srcFiles = [
        '<%%= config.app %>/scripts/intro.js',
        '<%%= config.app %>/scripts/controller/game-loop-controller.js',
        '<%%= config.app %>/scripts/controller/scene-controller.js',
        '<%%= config.app %>/scripts/scene/main-menu-scene.js',
        '<%%= config.app %>/scripts/scene/game-scene.js',
        '<%%= config.app %>/scripts/outro.js'
    ];

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        pkg: grunt.file.readJSON('package.json'),

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['injector', 'wiredep']
            },
            js: {
                files: ['<%%= config.app %>/scripts/**/**.js'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: []
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%%= config.app %>/images/{,*/}*'
                ],
                tasks: ['injector', 'wiredep']
            }
        },

        // Concatenate all of the js files in to one
        concat: {
            dist: {
                src: srcFiles,
                dest: '<%%= config.dist %>/scripts/<%%= pkg.name.replace(".js", "") %>.js'
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect().use('/app', connect.static('./app')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%%= config.dist %>',
                    livereload: false,
                    middleware: function(connect) {
                        return [
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect().use('/dist', connect.static('./dist')),
                            connect.static(config.dist)
                        ];
                    }
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= config.dist %>/*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= config.app %>/js/{,*/}*.js'
            ]
        },

        // Make all of the js code pretty
        jsbeautifier: {
            files: ['<%%= config.app %>/scripts/**/*.js', '<%%= config.dist %>/scripts/**/*.js'],
        },

        uglify: {
            dist: {
                options: {
                    mangle: true,
                    compress: {},
                    preserveComments: false
                },
                files: {
                    'dist/scripts/<%%= pkg.name.replace(".js", "") %>.min.js': ['<%%= concat.dist.dest %>']
                }
            }
        },

        // Wire the bower dependencies
        wiredep: {
            app: {
                ignorePath: /^\/|\.\.\//,
                devDependencies: true,
                src: ['<%%= config.app %>/index.html']
            },
            dist: {
                ignorePath: /^\/|\.\.\//,
                src: ['<%%= config.dist %>/index.html']
            }
        },

        // Inject the required files in the the HTML
        injector: {
            options: {
                relative: true,
                min: true,
                transform: function(filepath) {
                    var e = ext(filepath);
                    if (e === 'css') {
                        return '<link rel="stylesheet" href=".' + filepath + '">';
                    } else if (e === 'js') {
                        return '<script src=".' + filepath + '"></script>';
                    } else if (e === 'html') {
                        return '<link rel="import" href=".' + filepath + '">';
                    }
                },
                template: 'template.index.html'
            },
            app: {
                files: {
                    '<%%= config.app %>/index.html': [srcFiles, '<%%= config.app %>/styles/**.css']
                }
            },
            dist: {
                files: {
                    '<%%= config.dist %>/index.html': ['<%%= config.dist %>/scripts/<%%= pkg.name.replace(".js", "") %>.min.js', '<%%= config.dist %>/styles/**.css']
                }
            }
        },

        // Minify all of the images
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%%= config.app%>/images/',
                    src: ['**/*.{gif,GIF,jpg,JPG,png,PNG}'],
                    dest: '<%%= config.dist%>/images/',
                }]
            }
        },


        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.app %>',
                    dest: '<%%= config.dist %>',
                    src: [
                        '*.{ico,json,txt}',
                        '{,*/}*.html',
                        '**/*.json',
                        '**/*.anim',
                        'styles/*.css',
                        'sounds/{,*/}*.*',
                        'data/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: 'bower_components',
                    src: ['**'],
                    dest: '<%%= config.dist %>/bower_components'
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        bump: {
            options: {
                pushTo: 'origin'
            }
        },

        // gzip assets 1-to-1 for production
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '<%%= config.dist %>/',
                src: ['**/*'],
                dest: '<%%= config.dist %>/'
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            dist: [
                'copy:styles'
            ]
        }
    });

    grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function(target) {
        if (grunt.option('allow-remote')) {
            grunt.config.set('connect.options.hostname', '0.0.0.0');
        }
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'injector:app',
            'wiredep:app',
            'concurrent:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'jsbeautifier',
        'concat',
        'uglify',
        'newer:imagemin',
        'copy',
        'injector',
        'wiredep'
    ]);

    // release task
    grunt.registerTask('release', 'bump version, build, commit, tag, push', function(versionType) {
        grunt.task.run(['bump-only:' + (versionType || ''), 'default', 'bump-commit']);
    });

    grunt.registerTask('default', [
        'build'
    ]);
};