<?php
require 'vendor/autoload.php';
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$mongoClient = new MongoDB\Client('mongodb://localhost:27017');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $token = $_GET["token"];

    if ($redis->exists($token)) {
        $email = $redis->get($token);

        $profilesCollection = $mongoClient->selectDatabase('guvi')->profiles;
        $userProfile = $profilesCollection->findOne(['email' => $email]);

        header('Content-Type: application/json');
        echo json_encode($userProfile);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token']);
    }
} else {
    http_response_code(400); 
    echo json_encode(['error' => 'Invalid request method']);
}
?>
