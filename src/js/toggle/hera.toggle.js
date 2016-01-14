/*!
 * hera.toggle.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a display comportment with checkbox and radio buttons.
 *
 * Example of JS:
 *      $('fieldset.toggle').heraToggle({
 *          off: 'is-off',                              //class CSS used when toggle is off
 *          on: 'is-on'                                 //class CSS used when toggle is on
 *      });
 *
 * Example of HTML:
 *      <fieldset class="toggle">
 *          <label><input type="radio" name"toggle" value="off"/> Off</label>
 *          <label><input type="radio" name"toggle" value="on"/> On</label>
 *      </fieldset>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraToggle = function ($el,options){
        //vars
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        //bind the change event
        _hera.$el.find('input').on('change', $.proxy(_hera.change, _hera));
    };

    HeraToggle.prototype.$el = null;
    HeraToggle.prototype.options = null;

    HeraToggle.prototype.change = function (e){
        var _hera = this;

        //check type
        if (_hera.$el.hasClass(_hera.options.off)) {
            _hera.$el.removeClass(_hera.options.off);
            _hera.$el.addClass(_hera.options.on);
        }
        else {
            _hera.$el.removeClass(_hera.options.on);
            _hera.$el.addClass(_hera.options.off);
        }
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                off: 'is-off',
                on: 'is-on'
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraToggle($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraToggle = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraToggle');
            return false;
        }
    };
})(window.jQuery);
