<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'conexion.php';

$query = "SELECT d.*, c.nombre AS nombre, c.empresa AS empresa 
          FROM deudas d
          INNER JOIN clientes c ON d.cliente_id = c.id";

$resultado = $conn->query($query);

if ($resultado->num_rows > 0) {
    $deudas = array();

    while ($fila = $resultado->fetch_assoc()) {
        $deudas[] = $fila;
    }
    echo json_encode($deudas);
} else {
    echo json_encode(array());
}

$conn->close();
?>
