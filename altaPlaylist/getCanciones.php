<?php
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "bd_spotify";
    $usuario   = "root";
    $password  = "";

    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    mysqli_set_charset($conexion,"utf8");
    mysqli_query($conexion,"utf8");

    $sql = "SELECT titulo FROM cancion";
    $resultados = mysqli_query($conexion,$sql);

    $datos = [];

    while($fila = mysqli_fetch_array($resultados)){
        $datos[] = $fila;
    }

    echo json_encode($datos);

    mysqli_close($conexion);
?>