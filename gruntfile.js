module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        removelogging: {
            dist: {
                src: "js/app.js",
                dest: "js/app-clean.js",

                options: {
                    // see below for options. this is optional. 
                }
            }
          },
        
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/style.css': 'css/style.scss'
                }
            }
        },
        
        connect: {
            server: {
                options: {
                    host: 'localhost',
                    port: 3000,
                    livereload: true
                }
            }
        }, // connect
        
        watch: {
            scripts: {
                files: ['js/*.js',
                        'css/*.scss'],
                tasks: ['removelogging', 'sass'],
                options: {
                    spawn: false,
                },
            },
        }
        
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-remove-logging");
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['removelogging', 'sass', 'connect', 'watch']);

};