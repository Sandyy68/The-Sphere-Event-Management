<?php
include 'db_connection.php';

$sql = "SELECT * FROM sphere_shows ORDER BY date ASC";
$result = $conn->query($sql);

$shows = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $shows[] = $row;
    }
}

echo json_encode($shows);
$conn->close();
?>
