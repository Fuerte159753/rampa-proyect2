<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'conexion.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if(isset($data['folio'])) {

    $folio = $data['folio'];

    $query = "SELECT * FROM notas WHERE folios = '$folio'";

    $resultado = $conn->query($query);

    if ($resultado->num_rows > 0) {
        $notas = array();

        while ($fila = $resultado->fetch_assoc()) {
            $notas[] = $fila;
        }
        echo json_encode($notas);
    } else {
        echo json_encode(array());
    }
} else {
    echo json_encode(array('error' => 'No se proporcionó el folio de la deuda'));
}

$conn->close();
?>
