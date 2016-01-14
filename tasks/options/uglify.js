/*!
 * uglify.js
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

var _jq = './bower_components/jquery/dist/jquery.js',
  _bow = [
    //HandlebarsJS
    './bower_components/handlebars/handlebars.js',
    //Codemirror
    './bower_components/codemirror/lib/codemirror.js',
    './bower_components/codemirror/mode/clike/clike.js',
    './bower_components/codemirror/mode/css/css.js',
    './bower_components/codemirror/mode/diff/diff.js',
    './bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
    './bower_components/codemirror/mode/javascript/javascript.js',
    './bower_components/codemirror/mode/markdown/markdown.js',
    './bower_components/codemirror/mode/php/php.js',
    './bower_components/codemirror/mode/python/python.js',
    './bower_components/codemirror/mode/ruby/ruby.js',
    './bower_components/codemirror/mode/shell/shell.js',
    './bower_components/codemirror/mode/sql/sql.js',
    './bower_components/codemirror/mode/xml/xml.js',
    './bower_components/codemirror/mode/yaml/yaml.js',
    //Leaflet
    './bower_components/leaflet/dist/leaflet-src.js',
    //Pickadate
    './bower_components/pickadate/lib/picker.js',
    './bower_components/pickadate/lib/picker.date.js',
    './bower_components/pickadate/lib/picker.time.js',
    './bower_components/pickadate/lib/legacy.js',
    //Selectize
    './bower_components/selectize/dist/js/standalone/selectize.js'
  ];

module.exports = {
  src: {
    files: {
      //main package contains all scripts
      './dist/js/hera.min.js': [_jq].concat(_bow, [
        './src/js/**/*.js',
        '!./src/js/OlympusHera.js',
        './src/js/OlympusHera.js'
      ]),
      './dist/js/olz.min.js': _bow.concat([
        './src/js/**/*.js',
        '!./src/js/OlympusHera.js',
        './src/js/OlympusHera.js'
      ]),
      './dist/js/standalone/hera.min.js': [
        './src/js/**/*.js',
        '!./src/js/OlympusHera.js',
        './src/js/OlympusHera.js',
      ],

      //each script
      './dist/js/hera.background.min.js': [_jq, './src/js/background/hera.background.js'],
      './dist/js/standalone/hera.background.min.js': ['./src/js/background/hera.background.js'],

      './dist/js/hera.checkall.min.js': [_jq, './src/js/checkall/hera.checkall.js'],
      './dist/js/standalone/hera.checkall.min.js': ['./src/js/checkall/hera.checkall.js'],

      './dist/js/hera.checkit.min.js': [_jq, './src/js/checkit/hera.checkit.js'],
      './dist/js/standalone/hera.checkit.min.js': ['./src/js/checkit/hera.checkit.js'],

      './dist/js/hera.code.min.js': [
        _jq,
        './bower_components/codemirror/lib/codemirror.js',
        './bower_components/codemirror/mode/clike/clike.js',
        './bower_components/codemirror/mode/css/css.js',
        './bower_components/codemirror/mode/diff/diff.js',
        './bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
        './bower_components/codemirror/mode/javascript/javascript.js',
        './bower_components/codemirror/mode/markdown/markdown.js',
        './bower_components/codemirror/mode/php/php.js',
        './bower_components/codemirror/mode/python/python.js',
        './bower_components/codemirror/mode/ruby/ruby.js',
        './bower_components/codemirror/mode/shell/shell.js',
        './bower_components/codemirror/mode/sql/sql.js',
        './bower_components/codemirror/mode/xml/xml.js',
        './bower_components/codemirror/mode/yaml/yaml.js',
        './src/js/code/hera.code.js'
      ],
      './dist/js/standalone/hera.code.min.js': ['./src/js/code/hera.code.js'],

      './dist/js/hera.color.min.js': [_jq, './src/js/color/hera.color.js'],
      './dist/js/standalone/hera.color.min.js': ['./src/js/color/hera.color.js'],

      './dist/js/hera.date.min.js': [
        _jq,
        './bower_components/pickadate/lib/picker.js',
        './bower_components/pickadate/lib/picker.date.js',
        './bower_components/pickadate/lib/picker.time.js',
        './bower_components/pickadate/lib/legacy.js',
        './src/js/date/hera.date.js'
      ],
      './dist/js/standalone/hera.date.min.js': ['./src/js/date/hera.date.js'],

      './dist/js/hera.dragndrop.min.js': [_jq, './src/js/dragndrop/hera.dragndrop.js'],
      './dist/js/standalone/hera.dragndrop.min.js': ['./src/js/dragndrop/hera.dragndrop.js'],

      './dist/js/hera.link.min.js': [
        _jq,
        './bower_components/handlebars/handlebars.js',
        './src/js/link/hera.link.js'
      ],
      './dist/js/standalone/hera.link.min.js': ['./src/js/link/hera.link.js'],

      './dist/js/hera.maps.min.js': [
        _jq,
        './bower_components/leaflet/dist/leaflet-src.js',
        './src/js/maps/hera.maps.js'
      ],
      './dist/js/standalone/hera.maps.min.js': ['./src/js/maps/hera.maps.js'],

      './dist/js/hera.modal.min.js': [_jq, './src/js/modal/hera.modal.js'],
      './dist/js/standalone/hera.modal.min.js': ['./src/js/modal/hera.modal.js'],

      './dist/js/hera.multiselect.min.js': [
        _jq,
        './bower_components/selectize/dist/js/standalone/selectize.js',
        './src/js/multiselect/hera.multiselect.js'
      ],
      './dist/js/standalone/hera.multiselect.min.js': ['./src/js/multiselect/hera.multiselect.js'],

      './dist/js/hera.range.min.js': [_jq, './src/js/range/hera.range.js'],
      './dist/js/standalone/hera.range.min.js': ['./src/js/range/hera.range.js'],

      './dist/js/hera.social.min.js': [
        _jq,
        './bower_components/handlebars/handlebars.js',
        './src/js/social/hera.social.js'
      ],
      './dist/js/standalone/hera.social.min.js': ['./src/js/social/hera.social.js'],

      './dist/js/hera.textarea.min.js': [_jq, './src/js/textarea/hera.textarea.js'],
      './dist/js/standalone/hera.textarea.min.js': ['./src/js/textarea/hera.textarea.js'],

      './dist/js/hera.toggle.min.js': [_jq, './src/js/toggle/hera.toggle.js'],
      './dist/js/standalone/hera.toggle.min.js': ['./src/js/toggle/hera.toggle.js'],

      './dist/js/hera.tooltip.min.js': [_jq, './src/js/tooltip/hera.tooltip.js'],
      './dist/js/standalone/hera.tooltip.min.js': ['./src/js/tooltip/hera.tooltip.js'],

      './dist/js/hera.upload.min.js': [
        _jq,
        './bower_components/handlebars/handlebars.js',
        './src/js/upload/hera.upload.js'
      ],
      './dist/js/standalone/hera.upload.min.js': ['./src/js/upload/hera.upload.js'],

      './dist/js/hera.youtube.min.js': [_jq, './src/js/youtube/hera.youtube.js'],
      './dist/js/standalone/hera.youtube.min.js': ['./src/js/youtube/hera.youtube.js']
    }
  },

  options: {
    preserveComments: 'some'
  }
};
