<?php
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "bd_spotify";
    $usuario   = "root";
    $password  = "";
    
    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password, $basedatos) or die(mysqli_error($conexion));
    mysqli_set_charset($conexion,"utf8");
    mysqli_query($conexion,"utf8");
    
    // Consulta SQL para obtener los datos de los centros.
    $sql = "SELECT * FROM cancion";
    $resultados = mysqli_query($conexion,$sql);
    
    $XML ='<?xml version="1.0" encoding="UTF-8"?>';
    $XML .='<datos>';
    
    while ($fila = mysqli_fetch_array($resultados)) {
        //print_r($fila);
        $XML .='<cancion>';
            $XML .='<titulo>'.$fila[0].'</titulo>';
            $XML .='<artista>'.$fila[1].'</artista>';
            $XML .='<disco>'.$fila[2].'</disco>';
            $XML .='<genero>'.$fila[3].'</genero>';
            $XML .='<año>'.$fila[4].'</año>';
        $XML .='</cancion>';
    }
    
    $XML .='</datos>';
    
    // Cabecera de respuesta indicando que el contenido de la respuesta es XML
    header("Content-Type: text/xml");
    // Para que el navegador no haga cache de los datos devueltos por la página PHP.
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    
    echo $XML;
    
    mysqli_close($conexion);
?>
