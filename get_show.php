<?php
include 'db_connection.php';

$id = intval($_GET['id']);
$sql = "SELECT * FROM sphere_shows WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["error" => "Show not found"]);
}

$conn->close();
?>
