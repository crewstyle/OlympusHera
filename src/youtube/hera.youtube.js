/*!
 * hera.youtube.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin adds a Youtube integration into container.
 *
 * Example of JS:
 *      $('.yt-container').heraYoutube({
 *          url: 'https://www.youtube.com/watch?v=vNy344PbYyE',                 //item node to un/check
 *          ratio: 16/9,                                                        //closest node to item to add the selected class
 *          mute: true,                                                         //make it mute
 *          repeat: true,                                                       //repetable
 *          start: 0                                                            //position in seconds before start video
 *      });
 *
 * Example of HTML:
 *      <div class="yt-container"></div>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var HeraYoutube = function ($el,options){
        //vars
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        //get sizes
        _hera.options.width = _hera.$el.width();
        _hera.options.height = Math.ceil(_hera.options.width / _hera.options.ratio);

        //get Youtube video ID
        var _s = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
            _m = _hera.options.url.match(_s);

        //check the ID
        if (!_m || 11 != _m[7].length) {
            return false;
        }

        //update options
        _hera.options.video = _m[7];

        //initialize
        _hera.init();
    };

    HeraYoutube.prototype.$el = null;
    HeraYoutube.prototype.$wind = $(window);
    HeraYoutube.prototype.options = null;

    HeraYoutube.prototype.init = function (){
        var _hera = this;

        //youtube API
        var tag = document.createElement('script');
        tag.src = "//www.youtube.com/iframe_api";

        //include script
        var _first = document.getElementsByTagName('script')[0];
        _first.parentNode.insertBefore(tag, _first);

        //make the magic :)
        _hera.youtube();
    };

    HeraYoutube.prototype.youtube = function (){
        var _hera = this;

        //build wrapper
        var $wrap = $(document.createElement('div')).css({
            position: 'relative',
            zIndex: '3'
        }).html(_hera.$el.html());
        //build container
        var $cont = $(document.createElement('div')).addClass('yt-container').css({
            bottom: '0',
            left: '0',
            overflow: 'hidden',
            position: 'fixed',
            right: '0',
            top: '0',
            zIndex: '1'
        }).html('<div id="yt-player"></div>');
        //build stripes
        var $stripes = $(document.createElement('div')).addClass('yt-stripes').css({
            bottom: '0',
            left: '0',
            overflow: 'hidden',
            position: 'fixed',
            right: '0',
            top: '0',
            zIndex: '2'
        });

        //remove contents
        _hera.$el.html('');

        //append
        _hera.$el.prepend($wrap);
        _hera.$el.prepend($stripes);
        _hera.$el.prepend($cont);

        //bind resize event
        _hera.$wind.bind('resize', $.proxy(_hera.ytResize, _hera));

        //add triggers
        window.onYouTubeIframeAPIReady = function (){
            //create player
            window.player = new YT.Player('yt-player', {
                width: _hera.options.width,
                height: _hera.options.height,
                videoId: _hera.options.video,
                playerVars: {
                    controls: 0,
                    showinfo: 0,
                    modestbranding: 1,
                    wmode: 'transparent'
                },
                events: {
                    'onReady': ytReady,
                    'onStateChange': ytChange
                }
            });
        };
        window.ytChange = function (state){
            var _hera = this;

            //check position
            if (0 === state.data && _hera.options.repeat) {
                window.player.seekTo(_hera.options.start);
            }
        };

        window.ytReady = function (e){
            var _hera = this;

            //check mute
            if (_hera.options.mute) {
                e.target.mute();
            }

            //change position and autoplay
            e.target.seekTo(_hera.options.start);
            e.target.playVideo();
        };
    };

    HeraYoutube.prototype.ytResize = function (e){
        var _hera = this;

        //update sizes
        _hera.options.width = _hera.$el.width();
        _hera.options.height = Math.ceil(_hera.options.width / _hera.options.ratio);

        //affect sizes
        _hera.$el.find('.yt-container iframe')
            .width(_hera.options.width)
            .height(_hera.options.height);
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                url: 'https://www.youtube.com/watch?v=vNy344PbYyE',
                ratio: 16/9,
                mute: true,
                repeat: true,
                start: 0
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraYoutube($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraYoutube = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraYoutube');
            return false;
        }
    };
})(window.jQuery);
