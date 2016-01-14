/*!
 * hera.maps.js v2.0.0
 * https://github.com/crewstyle/OlympusHera
 *
 * This plugin change dynamically the maps preview.
 *
 * Example of JS:
 *      $('.maps').heraMaps({
 *          enable: 'enable',                           //selected class for reload button
 *          id: 'map-id',                               //container's Leaflet id
 *          inputs: ':input',                           //fields to get all configurations
 *          leafletid: 'leaflet-map-id',                //id used by Leaflet plugin
 *          map: '.maps',                               //map's container
 *          modal: '#modal-maps',                       //modal block ID
 *          reload: 'a.reload',                         //reload button
 *          updatebutton: 'a.get-maps'                  //add social network button
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

    var HeraMaps = function ($el,options){
        //vars
        var _hera = this;
        _hera.$el = $el;
        _hera.options = options;

        //get modal
        _hera.$modal = $(_hera.options.modal);

        //get elements
        _hera.$map = _hera.$el.find(_hera.options.map);
        _hera.$reload = _hera.$modal.find(_hera.options.reload);

        //init icon
        _hera.icon = 'http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images/marker-icon.png';

        //initialize maps
        _hera.map_init();

        //bind change event
        _hera.$el.find(_hera.options.updatebutton).on('click', $.proxy(_hera.open_modal, _hera));
        _hera.$reload.on('click', $.proxy(_hera.map_reload, _hera));
    };

    HeraMaps.prototype.address = null;
    HeraMaps.prototype.icon = null;
    HeraMaps.prototype.L = null;
    HeraMaps.prototype.lat = 48.882490;
    HeraMaps.prototype.layer = null;
    HeraMaps.prototype.lng = 2.371027;
    HeraMaps.prototype.map = null;
    HeraMaps.prototype.marker = null;
    HeraMaps.prototype.options = null;
    HeraMaps.prototype.zoom = null;
    HeraMaps.prototype.$el = null;
    HeraMaps.prototype.$map = null;
    HeraMaps.prototype.$modal = null;
    HeraMaps.prototype.$reload = null;

    HeraMaps.prototype.open_modal = function (e){
        e.preventDefault();
        var _hera = this;

        //open modal box
        _hera.$modal.heraModal({
            backdrop: '.olz-modal-backdrop'
        });
    };

    HeraMaps.prototype.get_datum = function (){
        var _hera = this,
            $el = _hera.$modal,
            _id = _hera.options.id;

        _hera.address = $el.find('#' + _id + '-address').val();
        _hera.zoom = parseInt($el.find('#' + _id + '-zoom').val());

        //return datum
        return {
            //globals
            address: _hera.address,
            width: $el.find('#' + _id + '-width').val(),
            height: $el.find('#' + _id + '-height').val(),
            zoom: _hera.zoom,
            //configurations
            type: $el.find('#' + _id + '-type').val(),
            //options
            dragndrop: $el.find('#' + _id + '-options-dragndrop').is(':checked'),
            streetview: $el.find('#' + _id + '-options-streetview').is(':checked'),
            zoomcontrol: $el.find('#' + _id + '-options-zoomcontrol').is(':checked'),
            mapcontrol: $el.find('#' + _id + '-options-mapcontrol').is(':checked'),
            scalecontrol: $el.find('#' + _id + '-options-scalecontrol').is(':checked'),
            pancontrol: $el.find('#' + _id + '-options-pancontrol').is(':checked'),
            rotatecontrol: $el.find('#' + _id + '-options-rotatecontrol').is(':checked'),
            rotatecontroloptions: $el.find('#' + _id + '-options-rotatecontroloptions').is(':checked'),
            scrollwheel: $el.find('#' + _id + '-options-scrollwheel').is(':checked'),
            overviewmapcontrol: $el.find('#' + _id + '-options-overviewmapcontrol').is(':checked'),
            overviewmapcontroloptions: $el.find('#' + _id + '-options-overviewmapcontroloptions').is(':checked')
        };
    };

    HeraMaps.prototype.map_init = function (){
        var _hera = this;

        //check leaflet variable
        if ('undefined' == typeof L || null === L) {
            return;
        }

        //update L
        _hera.L = L;

        //create a map
        _hera.map = L.map(_hera.options.leafletid).setView([_hera.lat, _hera.lng], 14);

        //update configurations
        _hera.map_refresh();
    };

    HeraMaps.prototype.map_marker = function (){
        var _hera = this;

        //check marker
        if (_hera.marker) {
            _hera.map.removeLayer(_hera.marker);
        }

        //build marker
        var _icon = _hera.L.icon({
            iconUrl: _hera.icon
        });

        //add marker
        _hera.marker = _hera.L.marker([_hera.lat, _hera.lng], {icon: _icon}).addTo(_hera.map);

        //define the view
        _hera.map.setView([_hera.lat, _hera.lng], _hera.zoom);
    };

    HeraMaps.prototype.map_refresh = function (){
        var _hera = this,
            _att = 'Built with ♥ by <a href="https://github.com/crewstyle/" target="_blank">Achraf Chouk</a> ~ &copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors';

        //get datum and coordinates
        var _datum = _hera.get_datum();

        //update sizes
        _hera.$map.css({
            height: _datum.height
        });

        //change sizes
        _hera.map.invalidateSize();

        //build layers
        if (!_hera.layer) {
            _hera.layer = {
                "Grayscale": _hera.L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
                    id: 'tto.map-grayscale',
                    attribution: _att
                }),
                "Watercolor": _hera.L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
                    id: 'tto.map-watercolor',
                    attribution: _att,
                    ext: 'png'
                }),
                "Blackcolor": _hera.L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
                    id: 'tto.map-black',
                    attribution: _att
                }),
            };

            //add layers
            _hera.L.control.layers(_hera.layer).addTo(_hera.map);

            //set default layer
            _hera.layer.Grayscale.addTo(_hera.map);
        }

        //define the zoom box
        if (_datum.scrollwheel) {
            _hera.map.scrollWheelZoom.enable();
        }
        else {
            _hera.map.scrollWheelZoom.disable();
        }

        //add marker
        _hera.map_marker();

        //change marker position
        _hera.map_remake();
    };

    HeraMaps.prototype.map_reload = function (e){
        e.preventDefault();
        var _hera = this;

        //update maps
        _hera.map_refresh();
        _hera.$modal.find('a.close').click();
    };

    HeraMaps.prototype.map_remake = function (){
        var _hera = this,
            _address = encodeURIComponent(_hera.address);

        //check address
        if (_address === '') {
            return;
        }

        //send JSON
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + _address,
            dataType: 'json',
            success: function (data){
                if ('OK' !== data.status) {
                    return;
                }

                //set latitude and longitude
                _hera.lat = data.results[0].geometry.location.lat;
                _hera.lng = data.results[0].geometry.location.lng;

                //set well formatted address
                _hera.address = data.results[0].formatted_address;
                _hera.$modal.find('#' + _hera.options.id + '-address').val(_hera.address);

                //add marker
                _hera.map_marker();
            }
        });
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                enable: 'enable',
                id: 'map-id',
                inputs: ':input',
                leafletid: 'leaflet-id',
                map: '.maps',
                modal: '#modal-maps',
                reload: 'a.reload',
                updatebutton: 'a.get-maps',
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new HeraMaps($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.heraMaps = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on heraMaps');
            return false;
        }
    };
})(window.jQuery);
