<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);

    $stmt->execute();

    $stmt->bind_result($hashedPassword);

    $stmt->fetch();

    if (password_verify($password, $hashedPassword)) {
        $response = array("success" => true, "message" => " successful!");
        echo json_encode($response);
    } else {
        $response = array("success" => false, "message" => "Login failed. check your credentials.");
        echo json_encode($response);
    }

}

$conn->close();
?>
