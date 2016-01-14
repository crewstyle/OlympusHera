/*!
 * hera.dragndrop.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a complete integration with Drag'n drop JS WordPress component.
 *
 * Example of JS:
 *      $('.dragndrop').heraDragndrop({
 *          handle: false,                              //create sortable lists with handles
 *          items: '.dragndrop',                        //specifiy which items inside the element should be sortable
 *          reorder: {
 *              parent: '.uploads',
 *              element: '.upload-items',
 *              items: '.item',
 *          }
 *      });
 *
 * Example of HTML:
 *      --
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraDragNDrop = function ($el,options){
        //vars
        var _hera = this,
            _sor = jQuery().sortable;

        //element
        _hera.$el = $el;
        _hera.options = options;

        //check Drag n drop plugin
        if (!_sor) {
            return;
        }

        //make the magic
        var _sort = $el.sortable(options);

        //bind event when its needed
        if (options.reorder) {
            _sort.bind('sortupdate', $.proxy(_hera.sortItems, _hera));
        }
    };

    HeraDragNDrop.prototype.$el = null;
    HeraDragNDrop.prototype.options = null;

    HeraDragNDrop.prototype.sortItems = function (e,i){
        var _hera = this;

        var $item = $(i.item),
            $list = _hera.$el.closest(_hera.options.reorder.parent).find(_hera.options.reorder.element),
            $targ = $list.find(_hera.options.reorder.items + '[data-id="' + $item.attr('data-id') + '"]'),
            _coun = $list.find(_hera.options.reorder.items).length,
            _indx = $item.index();

        //reorder elements
        if (0 === _indx) {
            $targ.prependTo($list);
        }
        else if ((_coun - 1) == _indx) {
            $targ.appendTo($list);
        }
        else {
            $targ.insertBefore($list.find(_hera.options.reorder.items + ':eq(' + _indx + ')'));
        }

        //fix TinyMCE bug
        $item.click();
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                handle: false,
                items: '.movendrop',
                reorder: false
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraDragNDrop($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraDragndrop = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraDragndrop');
            return false;
        }
    };
})(window.jQuery);
