/*!
 * hera.color.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a complete integration with WordPress colorPicker or Farbtastic.
 *
 * Example of JS:
 *      $('.colorpicker').heraColor({
 *          afterchange: '',                            //function to execute after changing value
 *          afterclear: '',                             //function to execute after clearing value
 *      });
 *
 * Example of HTML:
 *      <fieldset>
 *          <input type="text" class="colorpicker" />
 *      </fieldset>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraColor = function ($el,options){
        //vars
        var _hera = this,
            _wpcolor = jQuery().wpColorPicker;

        //element
        _hera.$el = $el;
        _hera.options = options;

        //WP version < 3.5
        if (!_wpcolor) {
            _hera.farbtastic();
        }
        //WP version >= 3.5
        else {
            _hera.colorpicker();

            $('a.iris-square-value').on('click', function (e){
                e.preventDefault();
            });
        }
    };

    HeraColor.prototype.$el = null;
    HeraColor.prototype.options = null;

    HeraColor.prototype.farbastic = function (){
        var _hera = this;

        //use functions plugin
        var _id = _hera.$el.attr('id');
        var $farb = $(document.createElement('div')).attr('id', _id + '_farb');
        $farb.insertAfter(_hera.$el);
        $farb.farbtastic('#' + _id);
    };

    HeraColor.prototype.colorpicker = function (){
        var _hera = this;

        //use functions plugin
        _hera.$el.wpColorPicker({
            change: function (){
                var _value = _hera.$el.wpColorPicker('color');
                _hera.$el.val(_value);

                //check if change option is defined and is a function, then execute it
                if ('function' === typeof _hera.options.afterchange) {
                    _hera.options.afterchange(_value);
                }
            },
            clear: function (){
                _hera.$el.val('');

                //check if change option is defined and is a function, then execute it
                if ('function' === typeof _hera.options.afterclear) {
                    _hera.options.afterclear();
                }
            }
        });
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                afterchange: '',
                afterclear: '',
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraColor($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraColor = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraColor');
            return false;
        }
    };
})(window.jQuery);
