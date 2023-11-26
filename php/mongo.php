<?php
require 'vendor/autoload.php';
$mongoDbUrl = 'mongodb://localhost:27017';
$mongoDbDatabase = 'guvi';

try {
    $mongoClient = new MongoDB\Client($mongoDbUrl);

    $mongoDb = $mongoClient->selectDatabase($mongoDbDatabase);


    $profilesCollection = $mongoDb->profiles;


} catch (MongoDB\Driver\Exception\ConnectionException $e) {
    echo "Failed to connect to MongoDB: " . $e->getMessage();
}
?>
