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

// Recibe el valor de idRegion desde JavaScript
$idRegion = $_GET['idRegion'];

// Consulta SQL para obtener los registros de la tabla pueblomagico con la condición
$sql = "SELECT idPuebloMagico, Nombre_pueblomagico, Descripcion_pueblomagico, url_PuebloMagico FROM pueblomagico WHERE Region_idRegion = ?";
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, 'i', $idRegion);
mysqli_stmt_execute($stmt);

$resultado = mysqli_stmt_get_result($stmt);

if (!$resultado) {
    die("Error al obtener los registros: " . mysqli_error($conexion));
}

$pueblos = array();

while ($fila = mysqli_fetch_assoc($resultado)) {
    $pueblos[] = $fila;
}

// Devolver los registros en formato JSON
// Verifica el contenido de $pueblos antes de enviar la respuesta JSON
echo json_encode($pueblos);

// Cerrar la conexión
mysqli_close($conexion);
?>
