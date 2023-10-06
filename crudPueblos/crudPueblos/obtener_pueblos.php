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

// Consulta SQL para obtener los registros de la tabla pueblomagico
$sql = "SELECT idPuebloMagico, Nombre_pueblomagico, Descripcion_pueblomagico, Region_idRegion FROM pueblomagico";

$resultado = mysqli_query($conexion, $sql);

if (!$resultado) {
    die("Error al obtener los registros: " . mysqli_error($conexion));
}

$pueblos = array();

while ($fila = mysqli_fetch_assoc($resultado)) {
    $pueblos[] = $fila;
}

// Devolver los registros en formato JSON
echo json_encode($pueblos);

// Cerrar la conexión
mysqli_close($conexion);
?>
