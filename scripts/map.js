/*jslint node: true*/
/*global ol*/
"use strict";

/*Déclaratino de la map*/
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

/*Géolocalisation*/
var geolocation = new ol.Geolocation({
    projection: view.getProjection()
});


function el(id) {
    return document.getElementById(id);
}

geolocation.on('change', function () {
    el('accuracy').innerText = geolocation.getAccuracy() + ' mètres';
});

el('track').addEventListener('change', function () {
    geolocation.setTracking(this.checked);
});

geolocation.on('error', function (error) {
    var info = document.getElementById('info');
    info.innerHTML = error.message;
    info.style.display = '';
});

var accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new ol.Feature();
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
});


new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: [accuracyFeature, positionFeature]
    })
});
