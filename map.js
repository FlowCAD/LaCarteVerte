var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([1.45556, 43.6066686]),
        zoom: 12
    }),
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen()
    ])
});