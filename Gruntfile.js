'use strict';

module.exports = function(grunt) {

  // Configurable paths for the library
  const libConfig = {
    examples: 'examples',
    dist: 'dist',
    test: 'test'
  };

  // Path to resolve file references
  const path = require('path');

  // Webpack for module and js compiling
  const webpack = require('webpack');

  // Config for webpack
  const webpackConfig = require('./webpack.config.js');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    config: libConfig,

    // Grunt connect server settings
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: true,
        base: '<%= config.examples %>'
      },
      dev: {
        options: {
          open: true,
          base: '<%= config.examples %>'
        }
      },
      prod: {
        options: {
          open: true,
          base: '<%= config.examples %>'
        }
      },
    },

    // Removes stale files
    clean: {
      dev: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.examples %>/{,*/}*.js',
            '<%= config.examples %>/{,*/}*.map'
          ]
        }]
      },
      test: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.test %>/js/*.js'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/{,*/}*.js'
          ]
        }]
      },
    },

    // Js lint
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: [
          'Gruntfile.js',
          'js/{,*/}*.js'
        ]
      }
    },

    // Handle modules and ES6 compiling with Babel Loader
    webpack: {
      options: webpackConfig,
      dev: {
        devtool: 'source-map',
        stats: {
          colors: true
        }
      },
      test: {
        output: {
          path: path.resolve(__dirname, '<%= config.test %>/js'),
          filename: 'fluid-image-mask.js'
        },
        plugins: webpackConfig.plugins.concat(
          new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            minimize: true,
            compress: {
              warnings: true,
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              screw_ie8: true
            },
            output: {
              comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
          })
        )
      },
      prod: {
        plugins: webpackConfig.plugins.concat(
          new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            minimize: true,
            compress: {
              warnings: true,
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              screw_ie8: true
            },
            output: {
              comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
          }),
          new webpack.optimize.AggressiveMergingPlugin()
        )
      },
      dist: {
        output: {
          path: path.resolve(__dirname, '<%= config.dist %>/'),
          filename: 'fluid-image-mask.js'
        },
        plugins: webpackConfig.plugins.concat(
          new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            minimize: true,
            compress: {
              warnings: true,
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              screw_ie8: true
            },
            output: {
              comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
          })
        )
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['src/{,*/}*.js'],
        tasks: ['jshint:all', 'webpack:dev'],
        options: {
          livereload: true
        }
      },
      config: {
        files: ['Gruntfile.js']
      },
      html: {
        files: ['<%= config.examples %>/{,*/}*.html'],
        options: {
          livereload: true
        }
      }
    },

    jasmine: {
      src: ['<%= config.test %>/js/*.js'],
      options: {
        specs: ['<%= config.test %>/spec/*.js']
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('serve', 'Compile and start connect server',
      function (target) {
    if (target === 'prod') {
      return grunt.task.run([
        'build',
        'connect:prod:keepalive'
      ]);
    }

    grunt.task.run([
      'dev',
      'connect:dev',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:test',
    'webpack:test',
    'jasmine'
  ]);

  grunt.registerTask('dev', [
    'clean:dev',
    'webpack:dev'
  ]);

  grunt.registerTask('build', [
    'clean:dev',
    'clean:dist',
    'webpack:prod',
    'webpack:dist',
    'test'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};