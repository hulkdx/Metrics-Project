<?php
/*
 * TODO register page
 */

// DB NAME
$DATABASE_NAME = "metrics";

// Create connection
$con = mysqli_connect("localhost", "root", "", $DATABASE_NAME);

// Check connection
if (mysqli_connect_errno($con)) {
	die("Connection failed: " . $conn -> connect_error);
}

if (isset($_POST['username']) && isset($_POST['password'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	// TODO ALL OTHER THINGS
	$query = "INSERT INTO `member`(`account`, `password`, `first_name`, `last_name`, `level_of_priviledges`, `email`, `phonenumber`) VALUES ('$username','$password','','','','','');";
	
}

?>