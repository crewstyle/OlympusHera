/*!
 * uglify.js
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

var _jq = './bower_components/jquery/dist/jquery.js';

module.exports = {
  app: {
    files: {
      //main package contains all scripts
      './dist/hera.min.js': [_jq, './src/**/*.js'],
      './dist/standalone/hera.min.js': ['./src/**/*.js'],

      //each script
      './dist/hera.background.min.js': [_jq, './src/background/hera.background.js'],
      './dist/standalone/hera.background.min.js': ['./src/background/hera.background.js'],

      './dist/hera.checkall.min.js': [_jq, './src/checkall/hera.checkall.js'],
      './dist/standalone/hera.checkall.min.js': ['./src/checkall/hera.checkall.js'],

      './dist/hera.checkit.min.js': [_jq, './src/checkit/hera.checkit.js'],
      './dist/standalone/hera.checkit.min.js': ['./src/checkit/hera.checkit.js'],

      './dist/hera.code.min.js': [
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
        './src/code/hera.code.js'
      ],
      './dist/standalone/hera.code.min.js': ['./src/code/hera.code.js'],

      './dist/hera.color.min.js': [_jq, './src/color/hera.color.js'],
      './dist/standalone/hera.color.min.js': ['./src/color/hera.color.js'],

      './dist/hera.date.min.js': [
        _jq,
        './bower_components/pickadate/lib/picker.js',
        './bower_components/pickadate/lib/picker.date.js',
        './bower_components/pickadate/lib/picker.time.js',
        './bower_components/pickadate/lib/legacy.js',
        './src/date/hera.date.js'
      ],
      './dist/standalone/hera.date.min.js': ['./src/date/hera.date.js'],

      './dist/hera.dragndrop.min.js': [_jq, './src/dragndrop/hera.dragndrop.js'],
      './dist/standalone/hera.dragndrop.min.js': ['./src/dragndrop/hera.dragndrop.js'],

      './dist/hera.link.min.js': [_jq, './src/link/hera.link.js'],
      './dist/standalone/hera.link.min.js': ['./src/link/hera.link.js'],

      './dist/hera.maps.min.js': [
        _jq,
        './bower_components/leaflet/dist/leaflet-src.js',
        './src/maps/hera.maps.js'
      ],
      './dist/standalone/hera.maps.min.js': ['./src/maps/hera.maps.js'],

      './dist/hera.modal.min.js': [_jq, './src/modal/hera.modal.js'],
      './dist/standalone/hera.modal.min.js': ['./src/modal/hera.modal.js'],

      './dist/hera.multiselect.min.js': [
        _jq,
        './bower_components/selectize/dist/js/standalone/selectize.js',
        './src/multiselect/hera.multiselect.js'
      ],
      './dist/standalone/hera.multiselect.min.js': ['./src/multiselect/hera.multiselect.js'],

      './dist/hera.range.min.js': [_jq, './src/range/hera.range.js'],
      './dist/standalone/hera.range.min.js': ['./src/range/hera.range.js'],

      './dist/hera.social.min.js': [_jq, './src/social/hera.social.js'],
      './dist/standalone/hera.social.min.js': ['./src/social/hera.social.js'],

      './dist/hera.textarea.min.js': [_jq, './src/textarea/hera.textarea.js'],
      './dist/standalone/hera.textarea.min.js': ['./src/textarea/hera.textarea.js'],

      './dist/hera.toggle.min.js': [_jq, './src/toggle/hera.toggle.js'],
      './dist/standalone/hera.toggle.min.js': ['./src/toggle/hera.toggle.js'],

      './dist/hera.tooltip.min.js': [_jq, './src/tooltip/hera.tooltip.js'],
      './dist/standalone/hera.tooltip.min.js': ['./src/tooltip/hera.tooltip.js'],

      './dist/hera.upload.min.js': [_jq, './src/upload/hera.upload.js'],
      './dist/standalone/hera.upload.min.js': ['./src/upload/hera.upload.js'],

      './dist/hera.youtube.min.js': [_jq, './src/youtube/hera.youtube.js'],
      './dist/standalone/hera.youtube.min.js': ['./src/youtube/hera.youtube.js']
    }
  },

  options: {
    preserveComments: 'some'
  }
};
