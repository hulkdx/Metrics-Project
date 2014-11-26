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

$username = 'hulk';
$password = '123456';
$query = "SELECT `member_id`, `account`, `password` FROM `member` WHERE (`account` = '$username') AND (`password` = '$password');";

$result = $con->query($query);

if ($result->num_rows > 0){
	while($row = $result->fetch_assoc()) {
		echo $row["account"];
		// TODO GO TO NEXT PAGE
	}
} else {
	echo "0 results";
	// TODO User and password is not correct
}
?>