<?php
include 'db.php';
include 'mongo.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT); 
    $email = $_POST["email"];
    $dob = $_POST["dob"];
    $age = $_POST["age"];
    $num = $_POST["num"];
    $op = $_POST["op"];
    $stmt = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?,?,?)");
    $stmt->bind_param("sss", $username,$password,$email);

    $query = array("username" => $username,"email"=>$email,"occupation"=>$op,"dob"=>$dob,"age"=>$age,"number"=>$num,);
    $userDetails = $profilesCollection->insertOne($query);
    if ($stmt->execute()) {
        $response = array("success" => true, "message" => "Registration successful!");
        echo json_encode($response);
      } else {
        $response = array("success" => false, "message" => "Registration failed. Please try again later.");
        echo json_encode($response);
      }

}

$conn->close();
?>
