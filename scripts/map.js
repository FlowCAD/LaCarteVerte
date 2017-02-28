/*jslint node: true*/
/*global ol*/
"use strict";

/*Déclaration de la map*/
var view = new ol.View({
    projection: 'EPSG:4326',
    center: [1.45556, 43.6066686],
    zoom: 12,
    minZoom: 11,
    maxZoom: 20
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen(),
        new ol.control.ScaleLine()
    ]),
    view: view
});

function el(id) {
    return document.getElementById(id);
}

/*Géolocalisation*/
var accuracyFeature = new ol.Feature(), positionFeature = new ol.Feature(), geolocFeatures;

geolocFeatures = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: [accuracyFeature, positionFeature]
    })
});

function geolocOn(geolocCB) {
    if (geolocCB.checked === true) {
        var geolocation = new ol.Geolocation({
            projection: view.getProjection()
        });

        geolocation.on('change', function () {
            el('accuracy').innerText = geolocation.getAccuracy() + ' mètres';
        });

        el('geolocCB').addEventListener('change', function () {
            geolocation.setTracking(this.checked);
        });

        geolocation.on('error', function (error) {
            var info = document.getElementById('info');
            info.innerHTML = error.message;
            info.style.display = '';
        });
        
        geolocation.on('change:accuracyGeometry', function () {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });

        positionFeature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#3399CC'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        }));

        geolocation.on('change:position', function () {
            var coordinates = geolocation.getPosition();
            positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
            view.setCenter(coordinates);
        });
    }/* else {
//        TODO : Retirer les features de géoloc
        map.removeLayer(geolocFeatures);
    }*/
}
