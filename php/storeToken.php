<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST["token"];
    $email = $_POST["email"];

    $redis->setex($token, 3600, $email);

    echo "Token stored in Redis successfully!";
} else {
    echo "Invalid request method";
}
?>
