var google;

function init() {
    var myLatlng = new google.maps.LatLng(46.99388150305104, 28.792235043890827); // Начальные координаты

    var mapOptions = {
        zoom: 15, // Уровень увеличения
        center: myLatlng,
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    
    var addresses = ['şos. Hînceşti 139, MD-2070, Chișinău'];

    for (var x = 0; x < addresses.length; x++) {
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(addresses[x]) + '&key=AIzaSyCiXONLrU0KpbXRMusZm56GtoPPZ_qaz70', null, function (data) {
            if (data.results.length > 0) {
                var p = data.results[0].geometry.location;
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'images/loc.png'
                });
                map.setCenter(latlng); // Установить центр карты на новый адрес
            } else {
                console.error("Адрес не найден: " + addresses[x]);
            }
        });
    }
}

google.maps.event.addDomListener(window, 'load', init);
