<?php
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "bd_spotify";
    $usuario   = "root";
    $password  = "";

    // Recojo los datos de entrada
    $datosJSON = $_POST["datosCliente"];

    //Decodifico el objeto cliente
    $cliente = json_decode($datosJSON);

    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    mysqli_set_charset($conexion,"utf8");
    mysqli_query($conexion,"utf8");

    $sql = "INSERT INTO cliente (nombre, correo, contraseña, premium) VALUES ('$cliente->nombre','$cliente->email','$cliente->password','$cliente->premium');";
    $resultado = mysqli_query($conexion,$sql);

    if ($resultado){
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "Alta realizada"; 
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
    }

    echo json_encode($respuesta);

    mysqli_close($conexion);
?>