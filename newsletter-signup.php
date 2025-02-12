<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'db_connection.php';

// Handle the form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email format!"]);
        exit;
    }

    // Check for duplicate email
    $checkEmail = $conn->prepare("SELECT id FROM newsletter WHERE email = ?");
    $checkEmail->bind_param("s", $email);
    $checkEmail->execute();
    $result = $checkEmail->get_result();

    if ($result->num_rows > 0) {
        echo "<script>
            alert('You are already subscribed!');
            localStorage.setItem('clearForm', 'true'); // Store flag
            window.location.href = document.referrer; // Go back to the previous page
        </script>";
        exit;
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO newsletter (name, email) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $email);

    if ($stmt->execute()) {
        echo "<script>alert('Thank you for subscribing!'); window.location.href = document.referrer;</script>";
    } else {
        echo "<script>alert('Subscription failed!'); window.location.href = document.referrer;</script>";
    }

    exit;
}

// Close connection
$conn->close();
?>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        if (localStorage.getItem("clearForm") === "true") {
            document.getElementById("newsletterForm").reset(); // Clear inputs
            localStorage.removeItem("clearForm"); // Remove flag
        }
    });
</script>