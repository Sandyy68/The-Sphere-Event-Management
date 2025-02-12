<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"] ?? "";
    $date = $_POST["date"] ?? "";
    $time = $_POST["time"] ?? "";
    $tickets = $_POST["tickets"] ?? "";

    if (!empty($name) && !empty($date) && !empty($time) && !empty($tickets)) {
        $stmt = $conn->prepare("INSERT INTO sphere_shows (name, date, time, tickets) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $name, $date, $time, $tickets);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Show added successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error adding show"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Please fill all fields"]);
    }
}
?>
