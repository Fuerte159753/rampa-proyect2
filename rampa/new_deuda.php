<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'conexion.php';

function obtenerSiguienteFolio($conn) {
    // Consulta para obtener el máximo folio actual
    $query = "SELECT MAX(folio) AS ultimo_folio FROM deudas";
    $resultado = $conn->query($query);

    if ($resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
        // Obtener el último folio y agregar uno para obtener el siguiente
        return $fila['ultimo_folio'] + 1;
    } else {
        // Si no hay ningún folio en la tabla, comenzamos desde 1
        return 1;
    }
}

if(isset($_POST['cliente']) && isset($_POST['fechaInicio']) && isset($_POST['fechaVencimiento']) && isset($_POST['monto'])) {
    $cliente = $_POST['cliente'];
    $fechaInicio = $_POST['fechaInicio'];
    $fechaVencimiento = $_POST['fechaVencimiento'];
    $monto = $_POST['monto'];

    if(!empty($cliente) && !empty($fechaInicio) && !empty($fechaVencimiento) && !empty($monto)) {
        $cliente = mysqli_real_escape_string($conn, $cliente);
        $fechaInicio = mysqli_real_escape_string($conn, $fechaInicio);
        $fechaVencimiento = mysqli_real_escape_string($conn, $fechaVencimiento);
        $monto = mysqli_real_escape_string($conn, $monto);
        $nuevoFolio = obtenerSiguienteFolio($conn);

        $query = "INSERT INTO deudas (folio, cliente_id, fecha_inicio, vencimiento, adeudo, adeudo_restante) VALUES ('$nuevoFolio', '$cliente', '$fechaInicio', '$fechaVencimiento', '$monto', '$monto')";

        if ($conn->query($query) === TRUE) {
            echo json_encode(array('success' => true, 'message' => 'La deuda se agregó correctamente'));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Error al agregar la deuda: ' . $conn->error));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Todos los campos son requeridos'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'No se recibieron todos los datos necesarios para agregar la deuda'));
}

$conn->close();
?>
