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


    $correo = $_REQUEST["usuario"];

    $sql = "SELECT playlist.nombre AS nombre, playlist_cancion.titulo_c AS titulo 
            FROM playlist 
            INNER JOIN playlist_cancion ON playlist_cancion.nombre_p=playlist.nombre 
            INNER JOIN cliente_playlist ON cliente_playlist.nombre_p=playlist.nombre 
            WHERE cliente_playlist.correo_c = '".$correo."'";

    
    $resultados = mysqli_query($conexion,$sql);
    
    $datos = [];

    while($fila = mysqli_fetch_array($resultados)){
        $datos[] = $fila;
    }

    echo json_encode($datos);

    mysqli_close($conexion);
?>