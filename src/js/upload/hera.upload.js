/*!
 * hera.upload.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin make the WordPress medialib popin usable in all backoffice pages.
 *
 * Example of JS:
 *      $('.upload').heraUpload({
 *          addbutton: '.add-media',                    //add media button
 *          color: '#ffaaaa',                           //background color used when deleting a media
 *          container: '.container',                    //node element of main container
 *          delallbutton: '.del-all-medias',            //delete all medias button
 *          delbutton: '.del-media',                    //delete media button
 *          items: 'fieldset',                          //node elements of items
 *          source: '#template-id',                     //node script element in DOM containing handlebars JS temlpate
 *
 *          //Options usefull for WordPress medialib
 *          media: null,                                //media WordPress object used to open modal
 *          multiple: false,                            //define if user can have multiple selection in modal
 *          //target: null,                               //
 *          title: false,                               //title of the media popin
 *          type: 'image',                              //define the kind of items to display in modal
 *          wpid: null,                                 //contains Wordpress textarea ID
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

    var HeraUpload = function ($el,options){
        //vars
        var _hera = this;

        //check medialib: this plugin works ONLY with WordPress medialib
        if (!wp || !wp.media) {
            return;
        }

        _hera.$el = $el;
        _hera.options = options;

        //initialize
        _hera.init();
    };

    HeraUpload.prototype.$el = null;
    HeraUpload.prototype.media = null;
    HeraUpload.prototype.options = null;
    HeraUpload.prototype.selections = null;
    HeraUpload.prototype.source = null;

    HeraUpload.prototype.init = function (){
        var _hera = this;

        //get wp id
        _hera.options.wpid = wp.media.model.settings.post.id;

        //set the template
        _hera.source = $(_hera.options.source).html();

        //bind events on click
        _hera.$el.find(_hera.options.addbutton).on('click', $.proxy(_hera.open_medialib, _hera));
        _hera.$el.find(_hera.options.delbutton).on('click', $.proxy(_hera.remove_media, _hera));
        _hera.$el.find(_hera.options.delallbutton).on('click', $.proxy(_hera.remove_all, _hera));
    };

    HeraUpload.prototype.open_medialib = function (e){
        e.preventDefault();
        var _hera = this;

        //check if the medialib object has already been created
        if (_hera.media) {
            _hera.opened_medialib();
            _hera.media.open();
            return;
        }

        //create and open medialib
        _hera.media = wp.media.frames.file_frame = wp.media({
            library: {
                type: _hera.options.type,
            },
            multiple: _hera.options.multiple,
            title: _hera.options.title
        });

        //check selection
        _hera.opened_medialib();

        //bind event when medias are selected
        _hera.media.on('select', function() {
            //get all selected medias
            _hera.selections = _hera.media.state().get('selection');

            //JSONify and display them
            _hera._attach_items(_hera.selections.toJSON());

            //restore the main post ID
            wp.media.model.settings.post.id = _hera.options.wpid;
        });

        //open the modal
        _hera.media.open();
    };

    HeraUpload.prototype.opened_medialib = function ($items){
        var _hera = this;

        //bind event when medialib popin is opened
        _hera.media.on('open', function (){
            var $items = _hera.$el.find(_hera.options.items);

            //check selections
            if (!$items.length) {
                return;
            }

            //get selected items
            _hera.selections = _hera.media.state().get('selection');

            //get all selected medias on multiple choices
            $.each($items, function (){
                var _id = $(this).attr('data-u'),
                    _attach = wp.media.attachment(_id);

                _attach.fetch();
                _hera.selections.add(_attach ? [_attach] : []);
            });
        });
    };

    HeraUpload.prototype.remove_all = function (e){
        e.preventDefault();
        var _hera = this;

        //iterate on all
        _hera.$el.find(_hera.options.delbutton).click();
    };

    HeraUpload.prototype.remove_media = function (e){
        e.preventDefault();
        var _hera = this;

        //vars
        var $self = $(e.target || e.currentTarget);
        var $item = $self.closest(_hera.options.items);

        //Deleting animation
        $item.css('background', _hera.options.color);
        $item.stop().animate({
            opacity: '0'
        }, 'slow', function (){
            $item.remove();
        });
    };

    HeraUpload.prototype._attach_items = function (_attach){
        var _hera = this;

        //check attachments
        if (!_attach.length) {
            return;
        }

        //get container
        var $target = _hera.$el.find(_hera.options.container);

        //iterate
        $.each(_attach, function (ind,elm){
            //check if element already exists
            if ($target.find(_hera.options.items + '[data-u="' + elm.id + '"]').length) {
                return;
            }
            //in single case, remove the other media
            else if (!_hera.options.multiple) {
                _hera.$el.find(_hera.options.delbutton).click();
            }

            //build JSON values
            var resp = {
                alt: elm.alt,
                caption: elm.caption,
                display: 'image' != _hera.options.type ? elm.icon : (elm.sizes.thumbnail ? elm.sizes.thumbnail.url : elm.url),
                icon: elm.icon,
                height: elm.height,
                id: elm.id,
                name: elm.name,
                sizes: [],
                url: elm.url,
                width: elm.width,
            };

            //check sizes
            $.each(elm.sizes, function (idx,el){
                resp.sizes.push({
                    height: el.height,
                    id: elm.id,
                    key: idx,
                    name: el.name,
                    url: el.url,
                    width: el.width,
                });
            });

            //update modal content and add binding event
            var template = Handlebars.compile(_hera.source);
            var upload = template(resp);

            //append all to target
            $target.append(upload);

            //Tootltip
            var $ups = $target.find(_hera.options.items).last();
            $ups.find('.olz-tooltip').heraTooltip();
            $ups.find(_hera.options.delbutton).on('click', $.proxy(_hera.remove_media, _hera));
        });
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                addbutton: '.add-media',
                color: '#ffaaaa',
                container: '.container',
                delallbutton: '.del-all-medias',
                delbutton: '.del-media',
                items: 'fieldset',
                source: '#template-id',

                //options usefull for WordPress medialib
                media: null,
                multiple: false,
                //target: null,
                title: false,
                type: 'image',
                wpid: null,
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraUpload($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraUpload = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraUpload');
            return false;
        }
    };
})(window.jQuery);
