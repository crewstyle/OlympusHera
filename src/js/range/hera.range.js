/*!
 * hera.range.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds range display in all range flieds.
 *
 * Example of JS:
 *      $('input[type="range"]').heraRange();
 *
 * Example of HTML:
 *      <fieldset>
 *          <input type="range"/>
 *          <output></output>
 *      </fieldset>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraRange = function ($el){
        //vars
        var _hera = this;
        _hera.$el = $el;

        //initialize
        _hera.init();
    };

    HeraRange.prototype.$el = null;
    HeraRange.prototype.$output = null;

    HeraRange.prototype.init = function (){
        var _hera = this,
            $output = _hera.$el.parent().find('output');

        //check output or create it
        if ($output.length) {
            _hera.$output = $output;
        }
        else {
            _hera.$output = $(document.createElement('output'));
            _hera.$output.insertAfter(_hera.$el);
        }

        //update
        _hera.$output.text(_hera.$el.val());

        //bind the change event
        _hera.$el.on('change', $.proxy(_hera.change, _hera));
    };

    HeraRange.prototype.change = function (){
        var _hera = this;
        _hera.$output.text(_hera.$el.val());
    };

    var methods = {
        init: function (){
            if (!this.length) {
                return false;
            }

            return this.each(function (){
                new HeraRange($(this));
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraRange = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraRange');
            return false;
        }
    };
})(window.jQuery);
