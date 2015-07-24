<?php
/*
Mohammad Jafarzadeh Rezvan
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
-------------------------------
Logout pages
 */

session_start();
if (session_destroy())// Destroying All Sessions
{
	// Redirecting To Home Page
	header("Location: ../main/index.php");
    echo "2";
}
?>
