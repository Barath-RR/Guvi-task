<?php
require 'vendor/autoload.php';
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$mongoClient = new MongoDB\Client('mongodb://localhost:27017');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST["token"];
    if ($redis->exists($token)) {
        $email = $redis->get($token);
    $username = $_POST["username"];
    $dob = $_POST["dob"];
    $phnumber = $_POST["phnumber"];
    $occupation = $_POST["occupation"];
    $age = $_POST["age"];

    if (validateInput($username, $dob, $phnumber)) {

        $profilesCollection = $mongoClient->selectDatabase('guvi')->profiles;
        $userProfile = $profilesCollection->updateOne(
            ['email' => $email],
            ['$set' => ['username' => $username, 'number' => $phnumber,'dob' => $dob,'occupation' => $occupation,'age' => $age]],
        );
        

        $response = array("success" => true, "message" => "Registration successful!");
        echo json_encode($response);
    } else {
        echo json_encode(["success" => false, "error" => "Invalid input"]);
    }
}
else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid token']);
} 
}
else {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}

function validateInput($username, $dob, $phnumber) {
    return $username !== "" && $dob !== "" && $phnumber !== "";
}
?>
