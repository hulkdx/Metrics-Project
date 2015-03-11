<?php
/*
Mohammad Jafarzadeh Rezvan
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
-------------------------------
register page
 */

include "db_connection.php";

// Create connection
 $con = mysqli_connect($hostname, $usrname, $password, $db_name);

// Check connection
if (mysqli_connect_errno($con)) {
	die("Connection failed: " . $conn -> connect_error);
}

if (isset($_POST['uname']) && isset($_POST['pass']) && isset($_POST['reg'])) {
	$username = $_POST['uname'];
	$password = $_POST['pass'];
	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	$email = $_POST['email'];
	$phone = $_POST['pnumb'];

	$query = "SELECT `account` FROM `member` WHERE `account`='$username';";
	

	if ($result=mysqli_query($con,$query))
  	{
  	  // Return the number of rows in result set
 	  $rowcount=mysqli_num_rows($result);
	  if ($rowcount != 0)
          {
		echo "Username already exists";
          }
	  else {
	     $query = "INSERT INTO `member`(`account`, `password`, `first_name`, `last_name`, `level_of_priviledges`, `email`, `phonenumber`) VALUES ('$username','$password','$fname','$lname','','$email','$phone');";
             if (!mysqli_query($con, $query)) {
	     } else {
                   // Redirect
		header("Location: ../main/index.php");		  	
             }
	  }
	}
}
?>