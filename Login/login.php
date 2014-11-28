<?php
/*
 * Login pages
 */

// DB NAME
$DATABASE_NAME = "metrics";

// Create connection
$con = mysqli_connect("localhost", "root", "", $DATABASE_NAME);

// Check connection
if (mysqli_connect_errno($con)) {
	die("Connection failed: " . $conn -> connect_error);
}

// Varibles from Redmine.php

 // TODO SQL injection?
$username = $_POST["uname"];
$password = $_POST["pass"];

$query = "SELECT `member_id` FROM `member` WHERE (`account` = '$username') AND (`password` = '$password');";

$result = $con->query($query);

if ($result->num_rows > 0){
	while($row = $result->fetch_assoc()) {
		// TODO GO TO NEXT PAGE
		header("Location: ../Layouts/main.html");
  		exit();
	}
} else {
	// TODO User and password is not correct
	echo "Wrong User and Password";
}
?>