/*!
 * hera.code.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a complete integration with codemirror JS component:
 * http://codemirror.net/
 *
 * Example of JS:
 *      $('textarea.code').heraCode({
 *          changer: '.change-mode',                    //node containing a list of all enabled modes
 *          container: '.container',                    //node containing all dom elements
 *          focused: 'focused',                         //selected class
 *          theme: 'monokai',                           //only Monokai theme is enabled
 *
 *          //The following options are described here: https://codemirror.net/doc/manual.html#config
 *          enterMode: 'keep',
 *          indentUnit: 4,
 *          indentWithTabs: false,
 *          lineNumbers: true,
 *          lineWrapping: true,
 *          matchBrackets: true,
 *          mode: 'application/json',
 *          tabMode: 'shift'
 *      });
 *
 * Example of HTML:
 *      <fieldset class="container">
 *          <select class="change-mode">
 *              <option value="text/css">CSS</option>
 *              <option value="application/json" selected="selected">JSON</option>
 *              <option value="text/x-python">Python</option>
 *              <option value="text/x-sh">Shell</option>
 *              <option value="application/xml">XML</option>
 *          </select>
 *          <textarea class="code"></textarea>
 *      </fieldset>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraCode = function ($el,options){
        //vars
        var _hera = this,
            _codemirror = CodeMirror;

        //check pickadate
        if (!CodeMirror) {
            return false;
        }

        //transform
        _hera.$el = $el;
        _hera.options = options;

        //readonly?
        _hera.options.readOnly = _hera.$el.attr('readonly') ? 'nocursor' : false;

        //codemirror
        _hera.editor = CodeMirror.fromTextArea(_hera.$el.get(0), _hera.options);
        _hera.$change = _hera.$el.closest(_hera.options.container).find(options.changer);

        //bind blur/focus event
        _hera.editor.on('blur', $.proxy(_hera.blurMode, _hera));
        _hera.editor.on('focus', $.proxy(_hera.focusMode, _hera));

        //bind on change event
        if (_hera.$change.length) {
            _hera.$change.on('change', $.proxy(_hera.changeMode, _hera));
        }
    };

    HeraCode.prototype.$el = null;
    HeraCode.prototype.$change = null;
    HeraCode.prototype.editor = null;
    HeraCode.prototype.options = null;

    HeraCode.prototype.blurMode = function (e){
        var _hera = this;
        _hera.$el.parent().removeClass(_hera.options.focused);
    };

    HeraCode.prototype.focusMode = function (e){
        var _hera = this;
        _hera.$el.parent().addClass(_hera.options.focused);
    };

    HeraCode.prototype.changeMode = function (e){
        var _hera = this;
        _hera.editor.setOption('mode', _hera.$change.val());
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                changer: '.change-mode',
                container: '.container',
                focused: 'focused',
                theme: 'monokai',

                //find more explanations here: https://codemirror.net/doc/manual.html#config
                enterMode: 'keep',
                indentUnit: 4,
                indentWithTabs: false,
                lineNumbers: true,
                lineWrapping: true,
                matchBrackets: true,
                mode: 'application/json',
                tabMode: 'shift'
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraCode($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraCode = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraCode');
            return false;
        }
    };
})(window.jQuery);
