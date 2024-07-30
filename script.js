var map;
    
    function initMap() {
        const coords = { lat: 19.71311, lng: -98.97427 }
        map = new google.maps.Map(document.getElementById('map'), {
            center: coords,
            zoom: 12
        });
    }
    
    function buscarDireccion() {
        var direccion = document.getElementById('direccion').value;
        var geocoder = new google.maps.Geocoder();
    
        geocoder.geocode({ 'address': direccion }, function (results, status) {
            if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
    
                // Búsqueda de lugares cercanos
                var service = new google.maps.places.PlacesService(map);
                var request = {
                    location: results[0].geometry.location,
                    radius: '5000', // Buscar dentro de un radio de 5 km
                    type: ['store'], // Puedes filtrar por tipo
                    keyword: 'tecnología reparaciones computadoras mantenimiento telefonos videojuegos consolas' // Buscar por palabras clave
                };
                service.nearbySearch(request, function (results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            var placeMarker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location,
                                title: place.name
                            });
    
                            // Crear una ventana de información específica para cada marcador
                            (function(marker, place) {
                                var infoWindow = new google.maps.InfoWindow({
                                    content: `<div><strong>${place.name}</strong><br>${place.vicinity}</div>`
                                });
    
                                // Asociar el evento de clic en el marcador con la ventana de información
                                marker.addListener('click', function() {
                                    infoWindow.open(map, marker);
                                });
                            })(placeMarker, place);
                        }
                    } else {
                        alert('No se encontraron lugares: ' + status);
                    }
                });
            } else {
                alert('La dirección no pudo ser encontrada: ' + status);
            }
        });
    }