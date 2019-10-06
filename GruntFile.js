
module.exports = function(grunt){
    
    const sass = require('node-sass');

    grunt.initConfig({
        concat: {
            js: {
                src: ['js/*.js'],
                dest:'dist/js/script.js'
            },
            css: {
                src: ['css/*.css'],
                dest:'dist/css/index.css'
            },
            html:{
                src: ['*.html'],
                dest:'dist/index.html'
            }
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
               files: [{
                   src: 'css/sass/index.scss',
                   dest: 'css/index.css'
               }]
            }
        },
        uglify: {
            build: {
                files: [{
                    src: 'dist/script.js',
                    dest: 'dist/script.js'
                }]
            }
        },
        htmlmin: {                                     
            dist: {                                      
              options: {                               
                removeComments: true,
                collapseWhitespace: true
              },
              files: {                                   
                'dist/index.html': 'dist/index.html',     
                
              }
            },
        },
        cssmin: {
            target: {
              files: [{
                src: ['dist/css/index.css'],
                dest: 'dist/css/index.css',
              }]
            }
        },
  connect: {
    server: {
      options: {
        directory:  'dist/index.html',
        port: 9000,
        base: 'app',
        keepalive: true,
        open: {
          target: 'http://localhost:9000'
        }
      }
    }
  },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'concat', 'htmlmin', 'cssmin', 'uglify'],
                options: {
                    interrupt: true,
              },
            },
            html: {
                files: '**/*.html',
                tasks: ['concat', 'sass', 'htmlmin', 'cssmin', 'uglify'],
                options: {
                    interrupt: true,
                }, 
            }
          }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('concat-js', ['concat:js']);
    grunt.registerTask('concat-css', ['concat:css']);  
    grunt.registerTask('default', ['sass']);
};




