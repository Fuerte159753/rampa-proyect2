<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_GET['id'])) {
    $clienteId = $_GET['id'];

    $sql = "DELETE FROM clientes WHERE id=$clienteId";

    if ($conn->query($sql) === TRUE) {
        $response = array('status' => 'success', 'message' => 'Cliente eliminado correctamente');
        echo json_encode($response);
    } else {
        $response = array('status' => 'error', 'message' => 'Error al eliminar el cliente: ' . $conn->error);
        echo json_encode($response);
    }
} else {
    $response = array('status' => 'error', 'message' => 'Se requiere el ID del cliente a eliminar');
    echo json_encode($response);
}
$conn->close();
?>
