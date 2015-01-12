<?php
/*
 * register page
 */

// DB NAME
$DATABASE_NAME = "metrics";

// Create connection
$con = mysqli_connect("localhost", "root", "", $DATABASE_NAME);

// Check connection
if (mysqli_connect_errno($con)) {
	die("Connection failed: " . $conn -> connect_error);
}

if (isset($_POST['uname']) && isset($_POST['pass']) && (isset($_POST['reg']))) {
	$username = $_POST['uname'];
	$password = $_POST['pass'];
	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	$email = $_POST['email'];
	$phone = $_POST['pnumb'];

	$query = "INSERT INTO `member`(`account`, `password`, `first_name`, `last_name`, `level_of_priviledges`, `email`, `phonenumber`) VALUES ('$username','$password','$fname','$lname','','$email','$phone');";

	if (!mysqli_query($con, $query)) {
	} else {
	};
	
	// Redirect
	header("Location: ../main/index.php");
}
?>