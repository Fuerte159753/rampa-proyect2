<?php
header("Access-Control-Allow-Origin: http://localhost:4200");  // Reemplaza con tu origen de Angular

// Otros encabezados para permitir ciertos métodos HTTP y encabezados
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root"; // Reemplaza con tu nombre de usuario de la base de datos
$password = ""; // Reemplaza con tu contraseña de la base de datos
$dbname = "rampa";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos de la solicitud
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// Consulta SQL para verificar las credenciales en la tabla de administradores
$sqlAdmin = "SELECT * FROM administrador WHERE correo = '$email' AND password = '$password'";

// Consulta SQL para verificar las credenciales en la tabla de callcenter
$sqlCallcenter = "SELECT * FROM callcenter WHERE correo = '$email' AND password = '$password'";

// Consulta SQL para verificar las credenciales en la tabla de clientes
$sqlCliente = "SELECT * FROM clientes WHERE correo = '$email' AND password = '$password'";

$resultAdmin = $conn->query($sqlAdmin);
$resultCallcenter = $conn->query($sqlCallcenter);
$resultCliente = $conn->query($sqlCliente);

if ($resultAdmin->num_rows > 0) {
    // Si se encuentra en la tabla de administradores, envía el tipo 0 (administrador)
    echo json_encode(array('message' => 'Inicio de sesión exitoso', 'tipeuser' => 0));
} elseif ($resultCallcenter->num_rows > 0) {
    // Si se encuentra en la tabla de callcenter, envía el tipo 1 (callcenter)
    echo json_encode(array('message' => 'Inicio de sesión exitoso', 'tipeuser' => 1));
} elseif ($resultCliente->num_rows > 0) {
    // Si se encuentra en la tabla de clientes, envía el tipo 2 (cliente)
    echo json_encode(array('message' => 'Inicio de sesión exitoso', 'tipeuser' => 2));
} else {
    echo json_encode(array('error' => 'Credenciales incorrectas'));
}

$conn->close();
?>