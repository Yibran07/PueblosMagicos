<?php
$servername = "localhost"; // Cambia esto al nombre de tu servidor MySQL
$username = "root"; // Cambia esto a tu nombre de usuario de MySQL
$password = ""; // Cambia esto a tu contraseña de MySQL
$database = "baseprueba"; // Cambia esto al nombre de tu base de datos

// Intenta conectar a la base de datos
$conn = new mysqli($servername, $username, $password, $database);

// Verifica si la conexión fue exitosa
if ($conn->connect_error) {
    echo "No se pudo conectar a la base de datos: " . $conn->connect_error;
} else {
    echo "Conexión a la base de datos exitosa!";
}

// Cierra la conexión
$conn->close();
?>

