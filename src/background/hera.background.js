/*!
 * hera.background.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin changes background attributes. Note that the background image
 * is set thanks to the Upload tto.upload.js plugin.
 *
 * Example of JS:
 *      $('.background').heraBackground({
 *          color: 'input[name="color"]',               //item node to set background color
 *          position: 'input[type="radio"]',            //item node to set background position
 *          preview: 'figure',                          //item node containing backgroud preview
 *          repeat: 'select[name="position"]',          //item node to set background repeat
 *      });
 * 
 * Example of HTML:
 *      <div class="background">
 *          <figure></figure>
 *          <fieldset>
 *              <label><input type="text" name="color" value="#000000" /></label>
 *              <select name="position">
 *                  <option value="left top">Left top</option>
 *                  <option value="center top">Center top</option>
 *                  <option value="right top">Right top</option>
 *              </select>
 *              <p>
 *                  <input type="radio" name="repeat" value="no-repeat"/> No repeat
 *                  <input type="radio" name="repeat" value="repeat-x"/> Repeat horizontally
 *                  <input type="radio" name="repeat" value="repeat-y"/> Repeat vertically
 *                  <input type="radio" name="repeat" value="repeat"/> Repeat all the way around
 *              </p>
 *              <p>
 *                  <input type="radio" name="size" value="auto"/> Default value
 *                  <input type="radio" name="size" value="cover"/> As large as possible
 *                  <input type="radio" name="size" value="contain"/> Width and height fit in the content area
 *              </p>
 *          </fieldset>
 *      </div>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraBackground = function ($el,options){
        //vars
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        //get inputs
        _hera.$color = _hera.$el.find(_hera.options.color);
        _hera.$position = _hera.$el.find(_hera.options.position);
        _hera.$repeat = _hera.$el.find(_hera.options.repeat);
        _hera.$size = _hera.$el.find(_hera.options.size);

        //get preview
        _hera.$preview = _hera.$el.find(_hera.options.preview);

        //color picker
        _hera.$color.heraColor({
            afterchange: function (value){
                _hera.$preview.css({
                    backgroundColor: value
                });
            }
        });

        //bind the change event
        _hera.$position.on('change', $.proxy(_hera.update_background, _hera));
        _hera.$repeat.on('change', $.proxy(_hera.update_background, _hera));
        _hera.$size.on('change', $.proxy(_hera.update_background, _hera));
    };

    HeraBackground.prototype.$color = null;
    HeraBackground.prototype.$el = null;
    HeraBackground.prototype.$preview = null;
    HeraBackground.prototype.$position = null;
    HeraBackground.prototype.$repeat = null;
    HeraBackground.prototype.$size = null;
    HeraBackground.prototype.options = null;

    HeraBackground.prototype.update_background = function (e){
        e.preventDefault();
        var _hera = this;

        //check repeat
        _hera.$preview.css({
            backgroundPosition: _hera.$position.filter(':checked').val(),
            backgroundRepeat: _hera.$repeat.val(),
            backgroundSize: _hera.$size.filter(':checked').val(),
        });
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                color: '.bg-color input',
                position: '.bg-position input',
                preview: '.bg-preview',
                repeat: '.bg-repeat select',
                size: '.bg-size input'
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraBackground($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraBackground = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraBackground');
            return false;
        }
    };
})(window.jQuery);
