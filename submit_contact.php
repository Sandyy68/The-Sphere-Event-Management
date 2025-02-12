<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'];
    $email = $_POST['email']; // Make sure the name matches your HTML form
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Debug: Check if database connection is working
    if (!$conn) {
        die("Database connection failed: " . $conn->connect_error);
    }

    // Prepare statement
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");

    // Debug: Check if statement preparation failed
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    // Bind parameters
    $stmt->bind_param("ssss", $name, $email, $subject, $message);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send message."]);
    }

    $stmt->close();
    $conn->close();
}
?>
