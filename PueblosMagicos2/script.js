// Función para crear tarjetas de una región específica
function crearTarjetas(region) {
    // Realiza una solicitud AJAX para obtener las tarjetas de la región específica
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'crear_tarjetas.php?region=' + region, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('cardsContainer').innerHTML = xhr.responseText;
        }
    };

    xhr.send();
}
