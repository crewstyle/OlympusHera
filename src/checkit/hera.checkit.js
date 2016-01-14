/*!
 * hera.checkit.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a display comportment with checkbox and radio buttons.
 *
 * Example of JS:
 *      $(':checkbox, :radio').heraCheckit({
 *          container: '.container',                    //node containing all items to un/check
 *          closest: 'label',                           //closest node to item to add the selected class
 *          selected: 'selected'                        //selected class
 *      });
 *
 * Example of HTML:
 *      <fieldset class="container">
 *          <label><input type="checkbox" /> Value 1</label>
 *          <label><input type="checkbox" /> Value 2</label>
 *          <label><input type="checkbox" /> Value 3</label>
 *      </fieldset>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraCheckIt = function ($el,options){
        //vars
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        //bind the change event
        _hera.$el.on('change', $.proxy(_hera.change, _hera));
    };

    HeraCheckIt.prototype.$el = null;
    HeraCheckIt.prototype.options = null;

    HeraCheckIt.prototype.change = function (){
        var _hera = this;

        //vars
        var _ctn = _hera.options.container,
            _clt = _hera.options.closest,
            _sel = _hera.options.selected;

        //check type
        if ('radio' == _hera.$el.attr('type')) {
            _hera.$el.closest(_ctn).find('.' + _sel).removeClass(_sel);
            _hera.$el.closest(_clt).addClass(_sel);
        }
        else if ('checkbox' == _hera.$el.attr('type')) {
            if (_hera.$el.is(':checked')) {
                _hera.$el.closest(_clt).addClass(_sel);
            }
            else {
                _hera.$el.closest(_clt).removeClass(_sel);
            }
        }
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                container: '.container',
                closest: 'label',
                selected: 'selected'
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraCheckIt($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraCheckit = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraCheckit');
            return false;
        }
    };
})(window.jQuery);
