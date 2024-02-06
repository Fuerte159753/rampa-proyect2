<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_GET['id'])) {
    $folio = $_GET['id'];

    $sql = "DELETE FROM deudas WHERE folio = $folio";

    if ($conn->query($sql) === TRUE) {
        $response = array('status' => 'success', 'message' => 'deuda eliminada');
        echo json_encode($response);
    } else {
        $response = array('status' => 'error', 'message' => 'Error al eliminar la deuda: ' . $conn->error);
        echo json_encode($response);
    }
} else {
    $response = array('status' => 'error', 'message' => 'Se requiere el folio para eliminar la deuda');
    echo json_encode($response);
}
$conn->close();
?>
