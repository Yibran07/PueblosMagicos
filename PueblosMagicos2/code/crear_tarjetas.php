<?php
$servername = "localhost"; // Cambia esto al nombre de tu servidor MySQL
$username = "root"; // Cambia esto a tu nombre de usuario de MySQL
$password = ""; // Cambia esto a tu contraseña de MySQL
$database = "baseprueba"; // Cambia esto al nombre de tu base de datos


// Intenta conectar a la base de datos
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    echo "No se pudo conectar a la base de datos: " . $conn->connect_error;
} else {
    // Consulta los pueblos mágicos de 'Región B'
    $sql = "SELECT Nombre, Descripcion, URLImagen FROM PueblosMagicos WHERE Region = 'Región B'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Genera las tarjetas HTML para los pueblos mágicos de 'Región B'
        while ($row = $result->fetch_assoc()) {
            echo '<div class="tarjeta">';
            echo '<img src="' . $row['URLImagen'] . '" alt="' . $row['Nombre'] . '">';
            echo '<div class="contenido">';
            echo '<h2>' . $row['Nombre'] . '</h2>';
            echo '<p>' . $row['Descripcion'] . '</p>';
            echo '</div>';
            echo '</div>';
        }
        
    } else {
        echo "No se encontraron pueblos mágicos en 'Región B'.";
    }

    $conn->close();
}
?>
