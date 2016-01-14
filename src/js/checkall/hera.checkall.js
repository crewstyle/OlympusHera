/*!
 * hera.checkall.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a check all feature with checkbox and radio fields.
 *
 * Example of JS:
 *      $('.master :checkbox').heraCheckall({
 *          container: '.container',                    //node containing all items to un/check
 *          items: '.list input[type="checkbox"]',      //item node to un/check
 *          closest: 'label',                           //closest node to item to add the selected class
 *          selected: 'selected'                        //selected class
 *      });
 * 
 * Example of HTML:
 *      <div class="container">
 *          <label class="master">
 *              <input type="checkbox" /> Un/check all
 *          </label>
 *          <fieldset class="list">
 *              <label><input type="checkbox" name="value" value="1" /> Value 1</label>
 *              <label><input type="checkbox" name="value" value="2" /> Value 2</label>
 *              <label><input type="checkbox" name="value" value="3" /> Value 3</label>
 *          </fieldset>
 *      </div>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraCheckAll = function ($el,options){
        //vars
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        //treat all elements
        var _bind = 'INPUT' == $el[0].nodeName ? 'change' : 'click';

        //list all items to check
        _hera.$checks = _hera.$el.closest(_hera.options.container).find(_hera.options.items);

        //bind the change/click event
        _hera.$el.on(_bind, $.proxy(_hera.click, _hera));
        _hera.$checks.on(_bind, $.proxy(_hera.refresh, _hera));
    };

    HeraCheckAll.prototype.$checks = null;
    HeraCheckAll.prototype.$el = null;
    HeraCheckAll.prototype.options = null;

    HeraCheckAll.prototype.click = function (e){
        e.preventDefault();
        var _hera = this;

        //check or uncheck targets
        _hera.$checks.filter(':not(:disabled)').attr('checked', _hera.$el.is(':checked'));

        //add or remove selected CSS class
        if (_hera.$el.is(':checked')) {
            _hera.$checks.closest(_hera.options.closest).addClass(_hera.options.selected);
        }
        else {
            _hera.$checks.closest(_hera.options.closest).removeClass(_hera.options.selected);
        }
    };

    HeraCheckAll.prototype.refresh = function (e){
        e.preventDefault();
        var _hera = this;

        //check or uncheck targets
        var _check = _hera.$checks.not(':checked').length === 0;

        //update checks
        _hera.$el.attr('checked', _check);
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                container: '.container',
                items: 'input[type="checkbox"]',
                closest: 'label',
                selected: 'selected'
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraCheckAll($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraCheckall = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraCheckall');
            return false;
        }
    };
})(window.jQuery);
