var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [1.45556, 43.6066686],
        zoom: 12,
        minZoom: 11,
        maxZoom: 20
    }),
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen(),
        new ol.control.ScaleLine()
    ])
});
