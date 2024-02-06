<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'conexion.php';

// Verificar si se recibieron los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el ID del cliente a editar
    $clienteId = $_GET['id'];

    // Obtener los datos del formulario
    $organizacion = $_POST['organizacion'];
    $nombre = $_POST['name'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['mail'];
    $telefono = $_POST['phone'];
    $password = $_POST['password'];

    // Preparar la consulta SQL para actualizar el cliente
    $sql = "UPDATE clientes SET nombre='$nombre', apellido='$apellido', empresa='$organizacion', correo='$correo', password='$password', telefono='$telefono' WHERE id=$clienteId";

    // Ejecutar la consulta
    if ($conn->query($sql) === TRUE) {
        // Si la actualización fue exitosa, enviar una respuesta de éxito
        $response = array('status' => 'success', 'message' => 'Cliente actualizado correctamente');
        echo json_encode($response);
    } else {
        // Si hubo un error en la actualización, enviar una respuesta de error
        $response = array('status' => 'error', 'message' => 'Error al actualizar el cliente: ' . $conn->error);
        echo json_encode($response);
    }
} else {
    // Si la solicitud no es de tipo POST, enviar una respuesta de error
    $response = array('status' => 'error', 'message' => 'Método de solicitud no permitido');
    echo json_encode($response);
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
