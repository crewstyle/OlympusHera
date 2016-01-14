/*!
 * hera.link.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin change dynamically the href attribute for the link URL.
 *
 * Example of JS:
 *      $('input[type="url"]').heraLink({
 *          addbutton: '.add-link',                     //add link button
 *          color: '#ffaaaa',                           //background color used when deleting a social network
 *          container: 'fieldset',                      //node element containing all items
 *          delallbutton: 'a.del-all-links',            //delete all links button
 *          delbutton: 'a.del-link',                    //delete link button
 *          items: '.link-container',                   //node element which is used to count all elements
 *          linkbutton: 'input',                        //link button to make url clickable
 *          source: '#template-id'                      //node script element in DOM containing handlebars JS temlpate
 *      });
 *
 * Example of HTML:
 *      <div class="links">
 *          <fieldset>
 *              <div class="link-container">
 *                  <input type="url" />
 *              </div>
 *          </fieldset>
 *      </div>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraLink = function ($el,options){
        //vars
        var _hera = this;
        _hera.$el = $el;
        _hera.id = $el.attr('data-id');
        _hera.options = options;

        //update container
        _hera.$container = _hera.$el.find(_hera.options.container);

        //update number
        _hera.num = _hera.$container.find(_hera.options.items).length + 1;

        //set the template
        _hera.source = $(_hera.options.source).html();

        //bind click event
        _hera.$el.find(_hera.options.linkbutton).on('keyup', $.proxy(_hera.linketize, _hera));
        _hera.$el.find(_hera.options.addbutton).on('click', $.proxy(_hera.add_block, _hera));
        _hera.$el.find(_hera.options.delbutton).on('click', $.proxy(_hera.remove_block, _hera));
        _hera.$el.find(_hera.options.delallbutton).on('click', $.proxy(_hera.remove_all, _hera));
    };

    HeraLink.prototype.$el = null;
    HeraLink.prototype.$container = null;
    HeraLink.prototype.id = null;
    HeraLink.prototype.options = null;
    HeraLink.prototype.num = 0;
    HeraLink.prototype.source = null;

    HeraLink.prototype.linketize = function (e){
        e.preventDefault();
        var _hera = this;

        //vars
        var $self = $(e.target || e.currentTarget);

        //change href attribute
        $self.next('a').attr('href', $self.val());
    };

    HeraLink.prototype.add_block = function (e){
        e.preventDefault();
        var _hera = this,
            _id = '',
            _name = '';

        //vars
        var $self = $(e.target || e.currentTarget);

        //update number
        _hera.num++;

        //build contents
        var resp = {
            id: _hera.id,
            lfor: _hera.id + '_' + _hera.num,
            num: _hera.num
        };

        //update modal content and add binding event
        var template = Handlebars.compile(_hera.source);
        var link = template(resp);

        //append all to target
        _hera.$container.append(link);

        //bind events
        var $link = _hera.$container.find(_hera.options.items).last();
        $link.find(_hera.options.linkbutton).on('keyup', $.proxy(_hera.linketize, _hera));
        $link.find(_hera.options.delbutton).on('click', $.proxy(_hera.remove_block, _hera));

        //Tootltip
        $link.find('.olz-tooltip').heraTooltip({position: 'right'});
    };

    HeraLink.prototype.remove_all = function (e){
        e.preventDefault();
        var _hera = this;

        //iterate on all
        _hera.$el.find(_hera.options.delbutton).click();
    };

    HeraLink.prototype.remove_block = function (e){
        e.preventDefault();
        var _hera = this;

        //vars
        var $self = $(e.target || e.currentTarget);
        var $parent = $self.closest(_hera.options.items);

        //deleting animation
        $parent.css('background', _hera.options.color);
        $parent.animate({
            opacity: '0'
        }, 'slow', function (){
            $parent.remove();
        });
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                addbutton: '.add-link',
                color: '#ffaaaa',
                container: 'fieldset',
                delallbutton: 'a.del-all-links',
                delbutton: 'a.del-link',
                items: '.link-container',
                linkbutton: '.block-link input',
                source: '#template-id'
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraLink($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraLink = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraLink');
            return false;
        }
    };
})(window.jQuery);
