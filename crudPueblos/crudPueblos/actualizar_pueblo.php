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

// Obtener los nuevos valores desde la solicitud POST
$idRegistro = $_POST['id'];
$nombreNuevo = $_POST['nombre'];
$descripcionNueva = $_POST['descripcion'];
$regionNueva = $_POST['region'];

// Preparar la consulta SQL para actualizar el registro
$sql = "UPDATE pueblomagico SET Nombre_pueblomagico = ?, Descripcion_pueblomagico = ?, Region_idRegion = ? WHERE idPuebloMagico = ?";

// Preparar una declaración SQL segura
if ($stmt = mysqli_prepare($conexion, $sql)) {
    // Vincular los parámetros
    mysqli_stmt_bind_param($stmt, "ssii", $nombreNuevo, $descripcionNueva, $regionNueva, $idRegistro);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        echo "Registro actualizado exitosamente.";
    } else {
        echo "Error al actualizar el registro: " . mysqli_error($conexion);
    }

    // Cerrar la declaración
    mysqli_stmt_close($stmt);
} else {
    echo "Error al preparar la consulta: " . mysqli_error($conexion);
}

// Cerrar la conexión
mysqli_close($conexion);
?>
