<?php
$host = 'localhost:3307';
$dbname = 'pueblos_magicos_oaxaca';
$username = 'pueblos';
$password = '123poi';

// Intentar conectar a la base de datos
$conexion = mysqli_connect($host, $username, $password, $dbname);

// Verificar la conexión
if (!$conexion) {
    die("La conexión a la base de datos falló: " . mysqli_connect_error());
}

// Obtener el nombre del registro a eliminar desde la solicitud POST
$idRegistro = $_POST['nombre'];

// Preparar la consulta SQL para eliminar el registro
$sql = "DELETE FROM pueblomagico WHERE idPuebloMagico = ?";

// Preparar una declaración SQL segura
if ($stmt = mysqli_prepare($conexion, $sql)) {
    // Vincular el parámetro
    mysqli_stmt_bind_param($stmt, "i", $idRegistro);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        echo "Registro eliminado exitosamente.";
    } else {
        echo "Error al eliminar el registro: " . mysqli_error($conexion);
    }

    // Cerrar la declaración
    mysqli_stmt_close($stmt);
} else {
    echo "Error al preparar la consulta: " . mysqli_error($conexion);
}

// Cerrar la conexión
mysqli_close($conexion);
?>
