<?php
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "bd_spotify";
    $usuario   = "root";
    $password  = "";

    // Recojo los datos de entrada
    $datosJSON = $_POST["datosSesion"];

    //Decodifico el objeto cliente
    $sesion = json_decode($datosJSON);

    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    mysqli_set_charset($conexion,"utf8");
    mysqli_query($conexion,"utf8");

    $sql = "SELECT correo,contraseña FROM cliente WHERE correo LIKE '".$sesion->email."' AND contraseña LIKE '".$sesion->password."'";
    $consulta = mysqli_query($conexion,$sql);

    $resultado = false;

    if($consulta = mysqli_query($conexion,$sql)){
        if(mysqli_num_rows($consulta) == 0)
            $resultado = false;
        else{
            $resultado = true;
        }
    }

    if ($resultado){
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "Sesión iniciada"; 
    } else {
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Error en el proceso de inicio de sesion: ".mysqli_error($conexion);
    }

    echo json_encode($respuesta);

    mysqli_close($conexion);
?>