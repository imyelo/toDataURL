module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha_phantomjs: {
      options: {
        reporter: 'dot'
      },
      cmd: ['test/cmd/index.html']
    },
    clean: {
      test: {
        src: ['test/cmd/app/case'],
        options: {
          force: true
        }
      }
    },
    copy: {
      test: {
        files: [
          {expand: true, cwd: './test/case/', src: ['**'], dest: 'test/cmd/app/case/'},
        ]
      }
    },
    duojs: {
      main: {
        options: {
          root: './src',
          entry: './index.js',
          standalone: 'toDataURL',
          buildTo: '../dest',
          installTo: '../components'
        }
      }
    },
    watch: {
      libs: {
        files: 'libs/**/**',
        tasks: ['test']
      },
      tests: {
        files: 'test/**/**',
        tasks: ['test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-duojs');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('compile', ['duojs']);
  grunt.registerTask('_dev', ['test']);
  grunt.registerTask('test', ['compile', 'copy:test', 'mocha_phantomjs:cmd', 'clean:test']);
  grunt.registerTask('dev', ['watch']);
};
