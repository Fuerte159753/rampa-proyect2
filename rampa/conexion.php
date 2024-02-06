<?php
$host = "localhost";
$usuario = "root";
$contrasena = "";
$base_datos = "rampa";
$conn = new mysqli($host, $usuario, $contrasena, $base_datos);
if ($conn->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>