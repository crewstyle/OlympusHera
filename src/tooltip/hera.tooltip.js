/*!
 * hera.tooltip.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a tooltip when it's asked.
 *
 * Example of JS:
 *      $('.tooltip').heraTooltip({
 *          css: 'tooltip',                             //CSS class name assigned to tooltip
 *          delayIn: 0,                                 //delay in milliseconds before opening tooltip
 *          delayOut: 0,                                //delay in milliseconds before closing tooltip
 *          fade: false,                                //transition animation                                          true|false
 *          position: 'top',                            //tooltip position                                              'top'|'bottom'|'left'|'right'
 *          offset: 0,                                  //tooltip offset between element and itself
 *          onHidden: null,                             //callback called when the tooltip is hidden
 *          onShown: null,                              //callback called when the tooltip is shown
 *          trigger: 'hover'                            //event to bind to open or close tooltip                        'hover'|'click'|'focus'
 *      });
 *
 * Example of HTML:
 *      <a href="https://github.com/crewstyle " title="Achraf Chouk's profile on Github.com" class="tooltip">
 *          Click here.
 *      </a>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraTooltip = function ($el,options){
        //vars
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        //initialize
        _hera.init();
    };

    HeraTooltip.prototype.$body = null;
    HeraTooltip.prototype.$el = null;
    HeraTooltip.prototype.$tooltip = null;
    HeraTooltip.prototype.$win = null;
    HeraTooltip.prototype.options = null;
    HeraTooltip.prototype.state = null;
    HeraTooltip.prototype.timer = null;
    HeraTooltip.prototype.trigger = null;

    HeraTooltip.prototype.init = function (){
        var _hera = this;

        //init globals
        _hera.$win = $(window);
        _hera.$body = $('body');
        _hera.state = 'hidden';

        //create tooltip with css class
        _hera.$tooltip = $(document.createElement('div')).css({
            zIndex: '9999',
            position: 'absolute',
        });
        _hera.$tooltip.addClass(_hera.options.css);

        //set the right trigger
        if ('click' == _hera.options.trigger) {
            _hera.trigger = {
                bind: 'click',
            };
        }
        else if ('focus' == _hera.options.trigger) {
            _hera.trigger = {
                open: 'focus',
                close: 'blur',
            };
        }
        else {
            _hera.trigger = {
                open: 'mouseenter',
                close: 'mouseleave',
            };
        }

        //bind the custom trigger event
        if ('click' == _hera.options.trigger) {
            _hera.$el.on(_hera.trigger.bind, $.proxy(_hera.trigger_toggle, _hera));
        }
        else {
            _hera.$el.on(_hera.trigger.open, $.proxy(_hera.trigger_open, _hera));
            _hera.$el.on(_hera.trigger.close, $.proxy(_hera.trigger_close, _hera));
        }

        //bind event on resize window
        _hera.$win.on('resize', $.proxy(_hera.set_position, _hera));
    };

    HeraTooltip.prototype.change_state = function (state){
        var _hera = this,
            _coords = {};

        //update tooltip' state
        if ('visible' === state) {
            _hera.state = 'visible';

            //append it to body
            _hera.$body.append(_hera.$tooltip);

            //set tooltips contents
            _hera.set_content();

            //get and set element position
            _hera.set_position();

            //callback when show tooltip
            //_hera.options.onShown.call(_hera);
        }
        else {
            _hera.state = 'hidden';

            //detach element from dom
            _hera.$tooltip.detach();

            //callback when hide tooltip
            //_hera.options.onHidden.call(_hera);
        }
    };

    HeraTooltip.prototype.get_position = function (){
        var _hera = this,
            _off = _hera.$el.offset(),
            coords = {};

        //cancel all arrow classes
        _hera.$tooltip.removeClass('arrow-top arrow-bottom arrow-left arrow-right');

        //usefull vars
        var _height = _hera.$el.outerHeight(),
            _width = _hera.$el.outerWidth(),
            _tt_height = _hera.$tooltip.outerHeight(),
            _tt_width = _hera.$tooltip.outerWidth();

        //return positions
        if ('top' == _hera.options.position) {
            _hera.$tooltip.addClass('arrow-bottom');

            //top
            return {
                left: _off.left + (_width / 2) - (_tt_width / 2),
                top: _off.top - _tt_height - _hera.options.offset,
            };
        }
        else if ('bottom' == _hera.options.position) {
            _hera.$tooltip.addClass('arrow-top');

            //bottom
            return {
                left: _off.left + (_width / 2) - (_tt_width / 2),
                top: _off.top + _height + _hera.options.offset,
            };
        }
        else if ('left' == _hera.options.position) {
            _hera.$tooltip.addClass('arrow-right');

            //left
            return {
                left: _off.left - _tt_width - _hera.options.offset,
                top: _off.top + (_height / 2) - (_tt_height / 2),
            };
        }
        else {
            _hera.$tooltip.addClass('arrow-left');

            //right
            return {
                left: _off.left + _width + _hera.options.offset,
                top: _off.top + (_height / 2) - (_tt_height / 2),
            };
        }
    };

    HeraTooltip.prototype.set_content = function (){
        var _hera = this;
        _hera.$tooltip.html(_hera.$el.attr('title'));
        _hera.$el.removeAttr('title');
    };

    HeraTooltip.prototype.set_position = function (){
        var _hera = this;

        //set coordinates
        var _coords = _hera.get_position();
        _hera.$tooltip.css(_coords);
    };

    HeraTooltip.prototype.trigger_close = function (e){
        e.preventDefault();
        var _hera = this,
            _delay = _hera.options.delayOut;

        //clear timer in all cases
        clearTimeout(_hera.timer);

        //close with timer if needed
        if (0 === _delay) {
            _hera.change_state('hidden');
        }
        else {
            _hera.timer = setTimeout(function (){
                _hera.change_state('hidden');
            }, _delay);
        }
    };

    HeraTooltip.prototype.trigger_open = function (e){
        e.preventDefault();
        var _hera = this,
            _delay = _hera.options.delayIn;

        //clear timer in all cases
        clearTimeout(_hera.timer);

        //open with timer if needed
        if (0 === _delay) {
            _hera.change_state('visible');
        }
        else {
            _hera.timer = setTimeout(function (){
                _hera.change_state('visible');
            }, _delay);
        }
    };

    HeraTooltip.prototype.trigger_toggle = function (e){
        e.preventDefault();
        var _hera = this;

        //make the good action works
        if (_hera.state === 'visible') {
            _hera.trigger_close(e);
        }
        else {
            _hera.trigger_open(e);
        }
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                css: 'tto-tooltip',
                delayIn: 0,
                delayOut: 0,
                fade: false,
                position: 'top',
                offset: 0,
                onHidden: null,
                onShown: null,
                trigger: 'hover'
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraTooltip($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraTooltip = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraTooltip');
            return false;
        }
    };
})(window.jQuery);
