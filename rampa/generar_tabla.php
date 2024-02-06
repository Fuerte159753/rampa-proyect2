<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'conexion.php';

$sql = "SELECT id, nombre, apellido, empresa, correo, password, telefono FROM clientes";

$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    $clientes = array();

    while ($fila = $resultado->fetch_assoc()) {
        $clientes[] = $fila;
    }

    $json_clientes = json_encode($clientes);

    header('Content-Type: application/json');
    echo $json_clientes;
} else {

    echo json_encode(array());
}
$conn->close();
?>