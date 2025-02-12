<?php
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['name'], $data['date'], $data['time'], $data['tickets'])) {
    $id = isset($data['id']) ? intval($data['id']) : 0;
    $name = $conn->real_escape_string($data['name']);
    $date = $conn->real_escape_string($data['date']);
    $time = $conn->real_escape_string($data['time']);
    $tickets = intval($data['tickets']);

    if ($id > 0) {
        // Update existing record
        $sql = "UPDATE sphere_shows SET name='$name', date='$date', time='$time', tickets='$tickets' WHERE id=$id";
    } else {
        // Insert new record
        $sql = "INSERT INTO sphere_shows (name, date, time, tickets) VALUES ('$name', '$date', '$time', '$tickets')";
    }

    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
}

$conn->close();
?>
