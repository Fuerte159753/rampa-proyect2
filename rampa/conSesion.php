<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "conexion.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if(isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

        $queryAdmin = "SELECT * FROM administrador WHERE correo = '$email' AND password = '$password'";
        $resultAdmin = $conn->query($queryAdmin);

        $queryCallcenter = "SELECT * FROM callcenter WHERE correo = '$email' AND password = '$password'";
        $resultCallcenter = $conn->query($queryCallcenter);

        $queryCliente = "SELECT * FROM clientes WHERE correo = '$email' AND password = '$password'";
        $resultCliente = $conn->query($queryCliente);

        if ($resultAdmin->num_rows > 0) {
            echo json_encode(["tipeuser" => 0]);
        } elseif ($resultCallcenter->num_rows > 0) {
            echo json_encode(["tipeuser" => 1]);
        } elseif ($resultCliente->num_rows > 0) {
            echo json_encode(["tipeuser" => 2]);
        } else {
            echo json_encode(["error" => "Usuario no encontrado"]);
        }
    } else {
        // Manejo de error si los datos no están presentes
        echo json_encode(["error" => "Los datos de email y contraseña no fueron recibidos"]);
    }
$conn->close();
?>
