/*!
 * cssmin.js
 *
 * Copyright 2015 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

module.exports = {
  src: {
    files: {
      './dist/css/olz.min.css': [
        //Codemirror
        './bower_components/codemirror/lib/codemirror.css',
        './bower_components/codemirror/theme/monokai.css',
        //Leaflet
        './bower_components/leaflet/dist/leaflet.css',
        //Pickadate
        './bower_components/pickadate/lib/themes/classic.css',
        './bower_components/pickadate/lib/themes/classic.date.css',
        './bower_components/pickadate/lib/themes/classic.time.css',
        //Selectize
        './bower_components/selectize/dist/css/selectize.css',
        './bower_components/selectize/dist/css/selectize.default.css',
        './bower_components/selectize/dist/css/selectize.legacy.css',
        //main
        './bower_components/font-awesome/css/font-awesome.css',
        './src/css/olz.css'
      ],

      './dist/css/olz.admin.earth.css': [
        './src/css/olz.admin.earth.css'
      ],

      './dist/css/olz.admin.ocean.css': [
        './src/css/olz.admin.ocean.css'
      ],

      './dist/css/olz.admin.vulcan.css': [
        './src/css/olz.admin.vulcan.css'
      ],

      './dist/css/olz.admin.wind.css': [
        './src/css/olz.admin.wind.css'
      ],

      './dist/css/olz.login.css': [
        './bower_components/fontawesome/css/font-awesome.css',
        './src/css/olz.login.css'
      ]
    }
  }
};
