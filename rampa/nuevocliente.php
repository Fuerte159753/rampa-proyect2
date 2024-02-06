<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $organizacion = $_POST['organizacion'];
    $nombre = $_POST['name'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['mail'];
    $telefono = $_POST['phone'];
    $password = $_POST['password'];

    if (!empty($organizacion) && !empty($nombre) && !empty($apellido) && !empty($correo) && !empty($telefono) && !empty($password)) {
        $sql_last_id = "SELECT MAX(id) AS max_id FROM clientes";
        $result_last_id = $conn->query($sql_last_id);
        $last_id = $result_last_id->fetch_assoc()['max_id'];

        $sql_available_id = "SELECT id FROM clientes WHERE id <= $last_id";
        $result_available_id = $conn->query($sql_available_id);
        $available_id = 1;
        while ($row = $result_available_id->fetch_assoc()) {
            if ($available_id < $row['id']) {
                break;
            }
            $available_id = $row['id'] + 1;
        }
        $sql = "INSERT INTO clientes (id, nombre, apellido, empresa, correo, password, telefono) 
                VALUES ($available_id, '$nombre', '$apellido', '$organizacion', '$correo', '$password', '$telefono')";
        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Cliente registrado correctamente');
            echo json_encode($response);
        } else {
            $response = array('status' => 'error', 'message' => 'Error al registrar el cliente: ' . $conn->error);
            echo json_encode($response);
        }
    } else {
        $response = array('status' => 'error', 'message' => 'Todos los campos son requeridos');
        echo json_encode($response);
    }
} else {
    $response = array('status' => 'error', 'message' => 'Método de solicitud no permitido');
    echo json_encode($response);
}
$conn->close();
?>
