<?php
 
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "bd_spotify";
$usuario   = "root";
$password  = "";
 
$titulo = $_GET["txtTitulo"];
 
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(enviarResultados(0,[],$conexion));
mysqli_set_charset($conexion,"utf8");
 
// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT * FROM cancion WHERE UPPER(titulo) LIKE UPPER('%$titulo%');";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
 
if ($resultados){ // Si hay resultados
 
    $datos = [];
 
    while ($fila = mysqli_fetch_array($resultados)) {
       // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $datos[] = $fila;
    }
}
 
mysqli_close($conexion);
 
enviarResultados($resultados,$datos,$conexion);
 
function enviarResultados($resultados,$datos,$conexion){
    // Generar la respuesta
    header('Content-Type: application/json');
 
    if ($resultados ){
        $respuesta["error"] = 0; // No hay error
        $respuesta["mensaje"] = "Datos recuperados"; 
        $respuesta["datos"] = $datos;
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Error al obtener la información: ".mysqli_error($conexion);
        $respuesta["datos"] = [];
    }
 
    echo json_encode($respuesta);
}
?>
