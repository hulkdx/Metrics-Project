<?php
/*
Mohammad Jafarzadeh Rezvan
Metrics Monitoring Tool
Project Work 2014/2015
Updated: 5.1.2015
-------------------------------
redirected page on successful login.
TODO Still doesn't tell the user that their session expired or whatever
 */
 
session_start();
$user_check = $_SESSION['login_user'];

if(!isset($user_check)){
	//	header('Location: ../layout_2/index.php'); 
	// Redirecting To Login Page
	header('Location: index.php');
}
?>