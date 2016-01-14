/*!
 * hera.social.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a complete integration width a social buttons modal box.
 *
 * Example of JS:
 *      $('.social-block').heraSocial({
 *          active: 'active',                           //CSS class to selected social networks
 *          addbutton: 'a.add-social',                  //add social network button
 *          color: '#ffaaaa',                           //background color used when deleting a social network
 *          content: 'fieldset',                        //node element of main container
 *          delallbutton: 'a.del-all-socials',          //delete all social networks button
 *          delbutton: 'a.del-social',                  //delete social network button
 *          label: 'modal-id',                          //name used to be sent through the form
 *          items: 'fieldset > div',                    //social networks already selected
 *          modal: '#modal-socials',                    //modal block ID
 *          source: '#template-id'                      //node script element in DOM containing handlebars JS temlpate
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

    var HeraSocial = function ($el,options){
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        //initialize
        _hera.init();
    };

    HeraSocial.prototype.$el = null;
    HeraSocial.prototype.$modal = null;
    HeraSocial.prototype.options = null;
    HeraSocial.prototype.source = null;

    HeraSocial.prototype.init = function (){
        var _hera = this;

        //set the template
        _hera.source = $(_hera.options.source).html();

        //get modal
        _hera.$modal = $(_hera.options.modal);
        _hera.$modal.addClass(_hera.options.modalclass);

        //list networks
        $.each(_hera.$el.find(_hera.options.items), function (){
            _hera.$modal.find('a[data-nk="' + $(this).attr('data-nk') + '"]').addClass(_hera.options.active);
        });

        //bind events on click
        _hera.$el.find(_hera.options.addbutton).on('click', $.proxy(_hera.open_modal, _hera));
        _hera.$el.find(_hera.options.delbutton).on('click', $.proxy(_hera.remove_social, _hera));
        _hera.$el.find(_hera.options.delallbutton).on('click', $.proxy(_hera.remove_all, _hera));
        _hera.$modal.find('a[data-nk]').on('click', $.proxy(_hera.toggle_social, _hera));
    };

    HeraSocial.prototype.open_modal = function (e){
        e.preventDefault();
        var _hera = this;

        //list networks
        $.each(_hera.$el.find(_hera.options.items), function (){
            _hera.$modal.find('a[data-nk="' + $(this).attr('data-nk') + '"]').addClass(_hera.options.active);
        });

        //open modal box
        _hera.$modal.heraModal({
            backdrop: '.olz-modal-backdrop'
        });
    };

    HeraSocial.prototype.remove_all = function (e){
        e.preventDefault();
        var _hera = this;

        //iterate on all
        _hera.$el.find(_hera.options.delbutton).click();
    };

    HeraSocial.prototype.remove_social = function (e){
        e.preventDefault();
        var _hera = this;

        //get event object
        var $even = $(e.target);
        var $self = 'I' == $even[0].nodeName ? $even.closest('a') : $even;

        //network
        var _nwk = $self.attr('data-nk');

        //remove button
        _hera._toggle('remove', _nwk);
    };

    HeraSocial.prototype.toggle_social = function (e){
        e.preventDefault();
        var _hera = this;

        //get event object
        var $even = $(e.target);
        var $self = 'I' == $even[0].nodeName ? $even.closest('a') : $even;

        //network
        var _nwk = $self.attr('data-nk');

        //check what to do
        if ($self.hasClass(_hera.options.active)) {
            _hera._toggle('remove', _nwk);
        }
        else {
            _hera._toggle('create', _nwk);
        }
    };

    HeraSocial.prototype._create = function (nwk, $button){
        var _hera = this;

        //check if network is already added
        if (_hera.$el.find(_hera.options.items + '[data-nk="' + nwk + '"]').length) {
            $button.removeClass(_hera.options.active);
            return;
        }

        //get target
        var $target = _hera.$el.find(_hera.options.content);

        //build contents
        var resp = {
            nwk: nwk,
            lfor: _hera.options.label + '_' + nwk,
            title: $button.text(),
            style: $button.attr('style'),
            id: _hera.options.label,
            label: {
                value: '',
                placeholder: $button.attr('data-ll'),
            },
            link: {
                value: '',
                placeholder: $button.attr('data-lk'),
            },
        };

        //update modal content and add binding event
        var template = Handlebars.compile(_hera.source);
        var social = template(resp);

        //append all to target
        $target.append(social);

        //bind event on click
        var $social = _hera.$el.find(_hera.options.items + '[data-nk="' + nwk + '"]');
        $social.find(_hera.options.delbutton).on('click', $.proxy(_hera.remove_social, _hera));
    };

    HeraSocial.prototype._destroy = function (nwk){
        var _hera = this;

        //get target
        var $target = _hera.$el.find(_hera.options.content + ' > div[data-nk="' + nwk + '"]');

        //change button and add bind event
        $target.find(_hera.options.delbutton).off('click', $.proxy(_hera.remove_social, _hera));

        //remove element
        $target.css('backgroundColor', _hera.options.color);
        $target.stop().animate({
            opacity: '0'
        }, 'slow', function (){
            $target.remove();
        });
    };

    HeraSocial.prototype._toggle = function (action, nwk){
        var _hera = this;

        //get targets
        var $button = _hera.$modal.find('a[data-nk="' + nwk + '"]');

        //get target
        if ('create' === action) {
            //update button state
            $button.addClass(_hera.options.active);
            _hera._create(nwk, $button);
        }
        else if ('remove' === action) {
            //update button state
            $button.removeClass(_hera.options.active);
            _hera._destroy(nwk);
        }
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                active: 'active',
                addbutton: 'a.add-social',
                color: '#ffaaaa',
                content: 'fieldset',
                delallbutton: 'a.del-all-socials',
                delbutton: 'a.del-social',
                label: 'modal-id',
                items: 'fieldset > div',
                modal: '#modal-socials',
                source: '#template-id'
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraSocial($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraSocial = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraSocial');
            return false;
        }
    };
})(window.jQuery);
