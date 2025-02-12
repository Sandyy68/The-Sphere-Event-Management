<?php
$host = "localhost";
$user = "root"; // Change this if you have a different username
$pass = ""; // Change this if you have a password
$dbname = "FinalProject"; // Your database name

$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
