<?php
 
$datos["correo"] = $_REQUEST["correo"];
$datos["contraseña"] = $_REQUEST["contraseña"];
 
// Codifico el array asociativo en JSON (string)
$salida = json_encode($datos);
 
echo $salida;
// '{ "nombre" : "pepe", "apellidos" : "ramos" }'
?>
