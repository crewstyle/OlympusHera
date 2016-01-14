/*!
 * copy.js
 *
 * Copyright 2015 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

module.exports = {
  src: {
    files: [{
      //Fonts
      expand: true,
      flatten: true,
      src: [
        './bower_components/font-awesome/fonts/*',
        './bower_components/material-design-raleway-font/webfonts/*.woff'
      ],
      dest: './dist/fonts/'
    },

    {
      //Images
      cwd: './src/img/',
      expand: true,
      flatten: false,
      src: [
        '**/*'
      ],
      dest: './dist/img/'
    },

    {
      //Leaflet
      expand: true,
      flatten: true,
      src: [
        './bower_components/leaflet/dist/images/*'
      ],
      dest: './dist/css/images/'
    }]
  },
};
