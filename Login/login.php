<?php
/*
 * Login pages
 */

// DB NAME
$DATABASE_NAME = "metrics";

// Starting Session
session_start();

if(isset($_SESSION['login_user'])){
	header('Location: ../layout_2/main.php'); // Redirecting To Login Page
}

// Variable To Store Error Message
$error = '';

if (isset($_POST['submit'])) {
	if (empty($_POST['uname']) || empty($_POST['pass'])) {
		$error = "Username or Password is invalid";
	} else {
		// Define $username and $password
		$username = $_POST["uname"];
		$password = $_POST["pass"];
		// To protect MySQL injection for Security purpose
		$username = stripslashes($username);
		$password = stripslashes($password);
		$username = mysql_real_escape_string($username);
		$password = mysql_real_escape_string($password);

		// Create connection
		$con = mysqli_connect("localhost", "root", "", $DATABASE_NAME);

		// Check connection
		if (mysqli_connect_errno($con)) {
			die("Connection failed: " . $conn -> connect_error);
		}

		// Query
		$query = "SELECT `member_id` FROM `member` WHERE (`account` = '$username') AND (`password` = '$password');";

		$result = $con -> query($query);
		if ($result -> num_rows == 1) {
			$row = $result -> fetch_assoc();
			$_SESSION['login_user'] = $username;
			// go to main page
			header("Location: ../layout_2/main.php");
		} else {
			$error = "Username or Password is invalid";
		}
		// Closing Connection
		mysql_close();
	}
}
?>