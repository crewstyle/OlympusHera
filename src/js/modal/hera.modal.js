/*!
 * hera.modal.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin displays a modal box when it is asked.
 *
 * Example of JS:
 *      $('.modal-box').heraModal({
 *          afterclose: '',                             //function to execute after closing modal
 *          backdrop: '.modal-backdrop',                //backdrop dom element
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

    var HeraModal = function ($el,options){
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        _hera.$backdrop = $(_hera.options.backdrop);
        _hera.$body = $('body');

        //open modal
        _hera.open();
    };

    HeraModal.prototype.$el = null;
    HeraModal.prototype.$backdrop = null;
    HeraModal.prototype.$body = null;
    HeraModal.prototype.options = null;

    HeraModal.prototype.open = function (){
        var _hera = this;

        //check if modal is already shown
        if (true === _hera.$el.data('isShown')) {
            return;
        }

        //open modal
        _hera.$body.addClass('modal-open');
        _hera.$backdrop.addClass('opened');
        _hera.$el.show();
        _hera.$el.data('isShown', true);

        //bind close button
        _hera.$el.find('footer .close').on('click', $.proxy(_hera.close, _hera));
        _hera.$el.find('header .close').on('click', $.proxy(_hera.close, _hera));
        _hera.$backdrop.on('click', $.proxy(_hera.close, _hera));
    };

    HeraModal.prototype.close = function (e){
        e.preventDefault();
        var _hera = this;

        //close modal
        _hera.$body.removeClass('modal-open');
        _hera.$el.hide();
        _hera.$el.data('isShown', false);
        _hera.$backdrop.removeClass('opened');

        //check if close option is defined and is a function, then execute it
        if ('function' === typeof _hera.options.afterclose) {
            _hera.options.afterclose();
        }
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                afterclose: '',
                backdrop: '.modal-backdrop',
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraModal($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraModal = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraModal');
            return false;
        }
    };
})(window.jQuery);
