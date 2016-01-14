/*!
 * imagemin.js
 *
 * Copyright 2015 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

module.exports = {
  dist: {
    options: {
      cache: false
    },
    files: [{
      expand: true,
      cwd: './dist/img/',
      src: [
        '**/*.{png,gif,jpg,jpeg}'
      ],
      dest: './dist/img/'
    }]
  }
};
