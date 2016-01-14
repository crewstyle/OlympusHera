/*!
 * Olympus Hera
 * https://github.com/crewstyle/OlympusHera
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

module.exports = function (grunt){
  //------ [CONFIGURATION] ------//
  var Helpers = require('./tasks/helpers'),
    filterAvailable = Helpers.filterAvailableTasks,
    _ = grunt.util._,
    path = require('path');

  //read package
  Helpers.pkg = require('./package.json');

  //check time
  if (Helpers.isPackageAvailable('time-grunt')) {
    require('time-grunt')(grunt);
  }

  //loads task options from `tasks/options/` and tasks defined in `package.json`
  var config = _.extend({},
    require('load-grunt-config')(grunt, {
      configPath: path.join(__dirname, 'tasks/options'),
      init: false
    })
  );

  //loads tasks in `tasks`
  grunt.loadTasks('tasks');

  //set node environment
  config.env = process.env;


  //------ [TASKS REGISTRATION] ------//
  //JShint validation
  grunt.registerTask('test', 'Test JS files.', ['debug']);
  grunt.registerTask('debug', filterAvailable([
    'jshint:src'
  ]));

  //distributed task
  grunt.registerTask('default', 'Build minified & production-ready files.', [
    'start',
    'minify',
    'move',
    'end'
  ]);
  grunt.registerTask('start', filterAvailable(['clean:dist']));
  grunt.registerTask('minify', filterAvailable([
    'less:main',
    'less:earth',
    'less:ocean',
    'less:vulcan',
    'less:wind',
    'less:login',
    'cssmin:src',
    'uglify:src'
  ]));
  grunt.registerTask('move', filterAvailable(['copy:src']));
  grunt.registerTask('end', filterAvailable([
    'imagemin:dist',
    'clean:src'
  ]));


  //------ [INITIALIZATION] ------//
  grunt.initConfig(config);
};
