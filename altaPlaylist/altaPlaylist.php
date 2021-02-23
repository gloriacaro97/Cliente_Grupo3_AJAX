<?php
    // Configuración BASE DE DATOS MYSQL
    $servidor  = "localhost";
    $basedatos = "bd_spotify";
    $usuario   = "root";
    $password  = "";

    // Recojo los datos de entrada
    $datosJSON = $_POST["datosPlaylist"];
    //Decodifico el objeto playlist
    $playlist = json_decode($datosJSON);

    // Creamos la conexión al servidor.
    $conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
    mysqli_set_charset($conexion,"utf8");
    mysqli_query($conexion,"utf8");

    // Comprueba que no hay ninguna playlist con el mismo nombre
    $sqlCompruebaNombre = "SELECT nombre FROM playlist WHERE nombre LIKE '".$playlist->nombre."'";
    $consultaNombre = mysqli_query($conexion,$sqlCompruebaNombre);

    $resultadoNombre = false;

    if($consultaNombre = mysqli_query($conexion,$sqlCompruebaNombre)){
        if(mysqli_num_rows($consultaNombre) == 0)
            $resultadoNombre = true;
        else{
            $resultadoNombre = false;
        }
    }

    // Comprueba si el cliente es premium. Si no lo es, comprueba el número de playlist que tiene sea <= 3
    $sqlCompruebaPremium = "SELECT premium, COUNT(cliente_playlist.nombre_p) AS nPlaylists 
                            FROM cliente INNER JOIN cliente_playlist ON cliente.correo = cliente_playlist.correo_c 
                            WHERE cliente.correo LIKE '$playlist->cliente'";
    $consultaPremium = mysqli_query($conexion,$sqlCompruebaPremium);

    $resultadoPremium = false;

    if($consultaPremium){
        while($fila = $consultaPremium->fetch_assoc()){
            $premium = $fila['premium'];
            $nPlaylist = $fila['nPlaylists'];
        }

        if(($premium == 0 && $nPlaylist < 3) || $premium == 1){
            $resultadoPremium = true;
        }else{
            $resultadoPremium = false;
        }
    }

    if($resultadoNombre && $resultadoPremium){
        $sql1 = "INSERT INTO playlist (nombre) VALUES ('$playlist->nombre');";
        $sql2 = "INSERT INTO cliente_playlist (correo_c,nombre_p) VALUE ('$playlist->cliente','$playlist->nombre');";
        $sql3 = "INSERT INTO playlist_cancion (titulo_c,nombre_p) VALUES ";
        $canciones = $playlist->canciones;
        foreach($canciones as $titulo){
            $sql3 .= "('$titulo','$playlist->nombre'), ";
        }
        $sql3 = substr($sql3,0,strlen($sql3)-2);

        $resultado1 = mysqli_query($conexion,$sql1);
        $resultado2 = mysqli_query($conexion,$sql2);
        $resultado3 = mysqli_query($conexion,$sql3);

        if ($resultado1 && $resultado2 && $resultado3){
            $respuesta["error"] = 0;
            $respuesta["mensaje"] = "Playlist añadida"; 
        } else {
            $respuesta["error"] = 1;
            $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
        }
    } else if(!$resultadoNombre){
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Ya existe una playlist con ese nombre";
    } else if(!$resultadoPremium){
        $respuesta["error"] = 1;
        $respuesta["mensaje"] = "Ha llegado al límite de playlists";
    }

    

    echo json_encode($respuesta);

    mysqli_close($conexion);
?>