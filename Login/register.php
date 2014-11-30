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



?>