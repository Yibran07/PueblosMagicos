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

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$transporte = $_POST['transporte'];
$url = $_POST['url'];
$region = $_POST['region'];
$act = $_POST['act'];
$descAct = $_POST['descAct'];
$aloj = $_POST['aloj'];
$descAloj = $_POST['descAloj'];
$res = $_POST['res'];
$descRes = $_POST['descRes'];

$sqlActividad = "INSERT INTO actividad (Nombre_Actividad, Descripcion_Actividad) VALUES (?, ?);";
// Preparar una declaración SQL segura
if ($stmtActividad = mysqli_prepare($conexion, $sqlActividad)) {
    // Vincular los parámetros
    mysqli_stmt_bind_param($stmtActividad, "ss", $act, $descAct);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmtActividad)) {
        echo "Registro insertado exitosamente.";
    } else {
        echo "Error al insertar el registro: " . mysqli_error($conexion);
    }

    // Cerrar la declaración
    mysqli_stmt_close($stmtActividad);
} else {
    echo "Error al preparar la consulta: " . mysqli_error($conexion);
}

$sqlAlojamiento = "INSERT INTO alojamiento (Nombre_Alojamiento, Descripcion_Alojamiento) VALUES (?, ?);";
// Preparar una declaración SQL segura
if ($stmtAlojamiento = mysqli_prepare($conexion, $sqlAlojamiento)) {
    // Vincular los parámetros
    mysqli_stmt_bind_param($stmtAlojamiento, "ss", $aloj, $descAloj);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmtAlojamiento)) {
        echo "Registro insertado exitosamente.";
    } else {
        echo "Error al insertar el registro: " . mysqli_error($conexion);
    }

    // Cerrar la declaración
    mysqli_stmt_close($stmtAlojamiento);
} else {
    echo "Error al preparar la consulta: " . mysqli_error($conexion);
}

$sqlRestaurante = "INSERT INTO restaurante (Nombre_Restaurante, Descripcion_Restaurante) VALUES (?, ?);";
// Preparar una declaración SQL segura
if ($stmtRestaurante = mysqli_prepare($conexion, $sqlRestaurante)) {
    // Vincular los parámetros
    mysqli_stmt_bind_param($stmtRestaurante, "ss", $res, $descRes);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmtRestaurante)) {
        echo "Registro insertado exitosamente.";
    } else {
        echo "Error al insertar el registro: " . mysqli_error($conexion);
    }

    // Cerrar la declaración
    mysqli_stmt_close($stmtRestaurante);
} else {
    echo "Error al preparar la consulta: " . mysqli_error($conexion);
}



// Preparar la consulta SQL para insertar datos
$sql = "INSERT INTO pueblomagico (Nombre_pueblomagico, Descripcion_pueblomagico, Transporte_PuebloMagico, url_PuebloMagico, Region_idRegion) VALUES (?, ?, ?, ?, ?);";

// Preparar una declaración SQL segura
if ($stmt = mysqli_prepare($conexion, $sql)) {
    // Vincular los parámetros
    mysqli_stmt_bind_param($stmt, "ssssi", $nombre, $descripcion, $transporte, $url, $region);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        echo "Registro insertado exitosamente.";
    } else {
        echo "Error al insertar el registro: " . mysqli_error($conexion);
    }

    // Cerrar la declaración
    mysqli_stmt_close($stmt);
} else {
    echo "Error al preparar la consulta: " . mysqli_error($conexion);
}



// Cerrar la conexión
mysqli_close($conexion);
?>
