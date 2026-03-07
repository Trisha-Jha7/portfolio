<?php

$conn = new mysqli("localhost", "root", "", "portfolio");

if ($conn->connect_error) {
    die("Connection failed");
}

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$sql = "INSERT INTO contact (name, email, message)
        VALUES ('$name', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "<script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
          <script>
            window.onload = function() {
                Swal.fire({
                    title: 'Message Sent!',
                    text: 'I will get back to you soon 🌸',
                    icon: 'success',
                    confirmButtonColor: '#ffc0cb', // This is Pink!
                    background: '#fff0f5' // Lavender Blush/Light Pink
                }).then(() => {
                    window.location.href='index.html';
                });
            };
          </script>";
} else {
    echo "Error: " . $conn->error;
}

?>