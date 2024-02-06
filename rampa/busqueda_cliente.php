<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $termino = $_POST['termino'];
    $filtro = $_POST['filtro'];

    $termino = mysqli_real_escape_string($conn, $termino);
    $sql = "SELECT * FROM clientes WHERE $filtro LIKE '%$termino%'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $clientes = array();
        while ($row = $result->fetch_assoc()) {
            $clientes[] = $row;
        }
        echo json_encode($clientes);
    } else {
        echo json_encode(array());
    }
} else {
    $response = array('status' => 'error', 'message' => 'Método de solicitud no permitido');
    echo json_encode($response);
}
$conn->close();
?>