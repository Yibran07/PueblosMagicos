// Función para crear tarjetas de 'Región B'
function crearTarjetas() {
    // Realiza una solicitud AJAX para obtener las tarjetas de 'Región B'
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'crear_tarjetas.php', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('cardsContainer').innerHTML = xhr.responseText;
        }
    };

    xhr.send();
}
