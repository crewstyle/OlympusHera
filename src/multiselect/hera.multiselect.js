/*!
 * hera.multiselect.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin change dynamically the select tag with "multiple" attribute.
 *
 * Example of JS:
 *      $('select[multiple="true"]').heraMultiselect({
 *          container: '.container'                     //node element containing all data
 *      });
 *
 * Example of HTML:
 *      <fieldset class="container">
 *          <select multiple="true" data-value="1,2">
 *              <option value="1">Value 1</option>
 *              <option value="2">Value 2</option>
 *              <option value="3">Value 3</option>
 *          </select>
 *      </fieldset>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraMultiSelect = function ($el,options){
        //vars
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        //create hidden submittable field
        _hera.create();

        //make it Selectizable
        _hera.$sel = _hera.$el.selectize({
            //options
            plugins: [
                'drag_drop',
                'remove_button',
                'restore_on_backspace'
            ],
            create: false,
            //events
            onChange: $.proxy(_hera.onchange, _hera),
        });

        //refresh options
        _hera.refresh();
    };

    HeraMultiSelect.prototype.options = null;
    HeraMultiSelect.prototype.name = null;
    HeraMultiSelect.prototype.$el = null;
    HeraMultiSelect.prototype.$sel = null;
    HeraMultiSelect.prototype.$tar = null;

    HeraMultiSelect.prototype.create = function (){
        var _hera = this;

        _hera.name = _hera.$el.attr('name');

        //create elements
        _hera.hiddenize();

        //remove name element
        _hera.$el.removeAttr('name');

        //unselect all selected options
        _hera.$el.find('option:selected').removeAttr('selected');
    };

    HeraMultiSelect.prototype.hiddenize = function (){
        var _hera = this,
            _val = _hera.$el.attr('data-value').split(',');

        //remove all old hidden values
        _hera.$el.closest(_hera.options.container).find('input[name="' + _hera.name + '"]').remove();

        //create new ordered elements
        $.each(_val, function (ind,elm){
            //create element
            var $tar = $(document.createElement('input')).attr({
                type: 'hidden',
                name: _hera.name,
                value: elm
            });

            //append it
            _hera.$el.closest(_hera.options.container).append($tar);
        });
    };

    HeraMultiSelect.prototype.refresh = function (){
        var _hera = this,
            _val = _hera.$el.attr('data-value').split(','),
            _sel = _hera.$sel[0].selectize;

        //get all selected value
        for (var i = 0, len = _val.length; i < len; i++) {
            _sel.addItem(_val[i]);
        }
    };

    HeraMultiSelect.prototype.onchange = function (arg){
        var _hera = this,
            _val = null === arg || [] == arg ? '' : arg.join();

        //update the value
        _hera.$el.attr('data-value', _val);

        //update the positions
        _hera.hiddenize();
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                container: '.container',
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraMultiSelect($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraMultiselect = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraMultiselect');
            return false;
        }
    };
})(window.jQuery);
