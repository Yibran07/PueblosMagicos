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

// Recibe el valor de idPuebloMagico desde JavaScript
$idPuebloMagico = $_GET['idPuebloMagico'];

// Consulta SQL con JOIN para obtener los datos deseados
$sql = "SELECT
    pm.idPuebloMagico,
    pm.Nombre_pueblomagico,
    pm.Descripcion_pueblomagico,
    a.Nombre_Alojamiento AS NombreAlojamiento,
    a.Descripcion_Alojamiento AS DescripcionAlojamiento,
    r.Nombre_Restaurante AS NombreRestaurante,
    r.Descripcion_Restaurante AS DescripcionRestaurante,
    act.Nombre_Actividad AS NombreActividad,
    act.Descripcion_Actividad AS DescripcionActividad
FROM
    pueblomagico pm
LEFT JOIN
    alojamiento a ON pm.Alojamiento_idAlojamiento = a.idAlojamiento
LEFT JOIN
    restaurante r ON pm.Restaurante_idRestaurante = r.idRestaurante
LEFT JOIN
    actividad act ON pm.Actividad_idActividad = act.idActividad
WHERE
    pm.idPuebloMagico = ?";

// Preparar la consulta
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, 'i', $idPuebloMagico);

// Ejecutar la consulta
mysqli_stmt_execute($stmt);

$resultado = mysqli_stmt_get_result($stmt);

if (!$resultado) {
    die("Error al obtener los registros: " . mysqli_error($conexion));
}

$puebloMagico = array();

while ($fila = mysqli_fetch_assoc($resultado)) {
    $puebloMagico[] = $fila;
}

// Devolver los registros en formato JSON
echo json_encode($puebloMagico);

// Cerrar la conexión
mysqli_close($conexion);
?>
