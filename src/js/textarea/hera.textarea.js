/*!
 * hera.textarea.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a counter in all textarea flieds.
 *
 * Example of JS:
 *      $('textarea').heraTextarea();
 *
 * Example of HTML:
 *      <fieldset>
 *          <textarea></textarea>
 *      </fieldset>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraTextarea = function ($el){
        var _hera = this;
        _hera.$el = $el;

        //initialize
        _hera.init();
    };

    HeraTextarea.prototype.$el = null;
    HeraTextarea.prototype.$counter = null;

    HeraTextarea.prototype.init = function (){
        var _hera = this;

        //create counter
        _hera.$counter = $(document.createElement('span')).addClass('counter');
        _hera.$counter.text(_hera.$el.val().length);

        //append counter
        _hera.$counter.insertAfter(_hera.$el);

        //bind all event
        _hera.$el.on('blur', $.proxy(_hera.getBlur, _hera));
        _hera.$el.on('focus', $.proxy(_hera.getFocus, _hera));
        _hera.$el.on('keyup', $.proxy(_hera.charCounter, _hera));
    };

    HeraTextarea.prototype.charCounter = function (){
        var _hera = this;
        _hera.$counter.text(_hera.$el.val().length);
    };

    HeraTextarea.prototype.getBlur = function (){
        var _hera = this;
        _hera.$counter.removeClass('on');
    };

    HeraTextarea.prototype.getFocus = function (){
        var _hera = this;
        _hera.$counter.addClass('on');
    };

    var methods = {
        init: function (){
            if (!this.length) {
                return false;
            }

            return this.each(function (){
                new HeraTextarea($(this));
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraTextarea = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraTextarea');
            return false;
        }
    };
})(window.jQuery);
