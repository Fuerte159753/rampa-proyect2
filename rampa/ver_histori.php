<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'conexion.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);
if(isset($data['folio'])) {

    $folio = $data['folio'];

    $query = "SELECT * FROM historial WHERE id_deuda = '$folio'";

    $resultado = $conn->query($query);

    if ($resultado->num_rows > 0) {
        $historial = array();

        while ($fila = $resultado->fetch_assoc()) {
            $historial[] = $fila;
        }
        echo json_encode($historial);
    } else {
        echo json_encode(array());
    }
} else {
    echo json_encode(array('error' => 'No se proporcionó el folio de la deuda'));
}
$conn->close();
?>