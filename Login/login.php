<?php
/*
Mohammad Jafarzadeh Rezvan
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
-------------------------------
Login pages
 */

include "db_connection.php";

// Starting Session
session_start();

if (isset($_SESSION['login_user'])) {
	// Redirecting To main Page
	header('Location: ../main/project_list.php');
}

// Variable To Store Error Message
$error = '';

// Login button
if (isset($_POST['submit'])) {
	if (empty($_POST['uname']) || empty($_POST['pass'])) {
		$error = "Username or Password is invalid";
	} else {
		
		// Create connection
		$con = mysqli_connect($hostname, $usrname, $password, $db_name);

		// Define $username and $password
		$username = $_POST["uname"];
		$password = $_POST["pass"];
		// To protect MySQL injection for Security purpose
		$username = stripslashes($username);
		$password = stripslashes($password);
		$username = mysqli_real_escape_string($con, $username);
		$password = mysqli_real_escape_string($con, $password);


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
			header("Location: ../main/project_list.php");
		} else {
			$error = "Username or Password is invalid";
		}
		// Closing Connection
		//mysql_close();
	}
}

if (isset($_POST['register'])) {
	header("Location: ../main/register.php");
}
?>