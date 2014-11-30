<?php
/*
 * redirected page on successful login.
 */

session_start();
$user_check = $_SESSION['login_user'];

if(!isset($user_check)){
	header('Location: ../layout_2/index.php'); // Redirecting To Login Page
}
?>