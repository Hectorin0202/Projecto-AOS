function registrarLugar() {
    var nombre = document.getElementById('nombre').value;
    var direccion = document.getElementById('direccionRegistro').value;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': direccion }, function (results, status) {
        if (status === 'OK') {
            var location = results[0].geometry.location;
            new google.maps.Marker({
                map: map,
                position: location,
                title: nombre
            });
            alert('Lugar registrado con éxito');
            // Opcionalmente, envía estos datos a tu servidor/base de datos
            // Ejemplo: enviarAServidor(nombre, direccion, location.lat(), location.lng());
        } else {
            alert('La dirección no pudo ser encontrada: ' + status);
        }
    });
}
